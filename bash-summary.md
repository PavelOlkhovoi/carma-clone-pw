# Bash Commands Summary - GitHub Actions Workflow

This document summarizes the bash concepts and commands we discussed while working on the GitHub Actions workflow for handling multiple failed tests.

## Table of Contents
- [Pipeline and Error Handling](#pipeline-and-error-handling)
- [Exit Codes and Test Detection](#exit-codes-and-test-detection)
- [Text Processing with grep and sed](#text-processing-with-grep-and-sed)
- [Array Handling and String Formatting](#array-handling-and-string-formatting)
- [Common Issues and Solutions](#common-issues-and-solutions)

## Pipeline and Error Handling

### `set -o pipefail`
Changes how bash handles errors in pipelines.

**Without pipefail:**
```bash
failing_command | successful_command  # Pipeline succeeds (wrong!)
```

**With pipefail:**
```bash
set -o pipefail
failing_command | successful_command  # Pipeline fails (correct!)
```

### Complete Test Command
```bash
set -o pipefail
PW_CHANNEL=chrome npx nx e2e ${{ matrix.project }} --grep="smoke/" --skip-nx-cache --skipInstall 2>&1 | tee test_output.log
```

**Breakdown:**
- `set -o pipefail` → Fail pipeline if any command fails
- `PW_CHANNEL=chrome` → Use system Chrome browser
- `npx nx e2e` → Run end-to-end tests
- `--grep="smoke/"` → Only run smoke tests
- `--skip-nx-cache` → Don't use build cache
- `--skipInstall` → Skip npm install
- `2>&1` → Redirect stderr to stdout
- `| tee test_output.log` → Show output AND save to file

## Exit Codes and Test Detection

### Capturing Exit Codes
```bash
some_command
TEST_EXIT_CODE=$?  # $? contains exit code of last command
```

**Exit codes:**
- `0` = Success
- `1-255` = Various failure types

### Conditional Logic
```bash
if [ $TEST_EXIT_CODE -ne 0 ]; then
    echo "Tests failed!"
    # Analyze failure...
    exit $TEST_EXIT_CODE  # Preserve original exit code
fi
```

**Comparison operators:**
- `-eq` = equal
- `-ne` = not equal
- `-gt` = greater than
- `-lt` = less than

## Text Processing with grep and sed

### grep - Search for Patterns

**Basic syntax:**
```bash
grep [options] "pattern" filename
```

**Common options:**
- `-E` → Extended regex
- `-o` → Only show matching parts
- `-i` → Case insensitive
- `-v` → Invert match

**Examples:**
```bash
# Find lines with test failures
grep -E "(\.spec\.ts|FAIL|Failed|Error)" test_output.log

# Extract only filenames
grep -o "[a-zA-Z0-9_-]*\.spec\.ts" test_output.log
```

### sed - Stream Editor

**Basic syntax:**
```bash
sed [options] 'command' filename
```

**Substitute command:**
```bash
sed 's/pattern/replacement/flags'
```

**Extract filename from path:**
```bash
sed -E 's/.*\/([^\/]+\.spec\.ts).*/\1/'
```

**Regex breakdown:**
- `.*\/` → Everything up to last slash
- `([^\/]+\.spec\.ts)` → Capture filename ending in .spec.ts
- `.*` → Everything after
- `\1` → Replace with captured group

## Array Handling and String Formatting

### Creating Arrays from Command Output
```bash
FAILED_TESTS=($(grep -o "pattern" file | sort -u))
```

### Array Operations
```bash
# Get array length
FAILED_TESTS_COUNT=${#FAILED_TESTS[@]}

# Access all elements
echo "${FAILED_TESTS[*]}"

# Access specific element
echo "${FAILED_TESTS[0]}"

# Loop through array
for test in "${FAILED_TESTS[@]}"; do
    echo "Test: $test"
done
```

### String Manipulation
```bash
# Join array with pipe separator
GREP_PATTERN=$(IFS='|'; echo "${FAILED_TESTS[*]}")
# Result: "test1.spec.ts|test2.spec.ts|test3.spec.ts"

# Build formatted list
FAILED_TESTS_LIST=""
for test in "${FAILED_TESTS[@]}"; do
    FAILED_TESTS_LIST="${FAILED_TESTS_LIST}- ${test}\n"
done

# Output with newlines
echo -e "$FAILED_TESTS_LIST"
```

## Common Issues and Solutions

### Issue 1: printf with Dashes
**Problem:**
```bash
printf "- %s\n" "${FAILED_TESTS[@]}"  # Fails if filename starts with -
```

**Solution:**
```bash
for test in "${FAILED_TESTS[@]}"; do
    FAILED_TESTS_LIST="${FAILED_TESTS_LIST}- ${test}\n"
done
```

### Issue 2: File Existence Checks
```bash
if [ -f test_output.log ]; then
    echo "File exists"
else
    echo "File not found"
fi
```

### Issue 3: Multiple Fallback Methods
```bash
# Primary method
FAILED_TESTS=($(grep -E "complex_pattern" file | sed 'transform'))

# Fallback if empty
if [ ${#FAILED_TESTS[@]} -eq 0 ]; then
    FAILED_TESTS=($(grep -o "simple_pattern" file))
fi

# Final fallback
if [ ${#FAILED_TESTS[@]} -eq 0 ]; then
    FAILED_TESTS=("Unknown test")
fi
```

## Real-World Example: Failed Test Extraction

```bash
# Complete pipeline for extracting failed tests
if [ -f test_output.log ]; then
    # Method 1: Complex extraction
    FAILED_TESTS=($(grep -E "(\.spec\.ts|FAIL|Failed|Error)" test_output.log | \
                    grep -E "\.spec\.ts" | \
                    sed -E 's/.*\/([^\/]+\.spec\.ts).*/\1/' | \
                    sort -u))
    
    # Method 2: Simple fallback
    if [ ${#FAILED_TESTS[@]} -eq 0 ]; then
        FAILED_TESTS=($(grep -o "[a-zA-Z0-9_-]*\.spec\.ts" test_output.log | sort -u))
    fi
    
    # Method 3: Final fallback
    if [ ${#FAILED_TESTS[@]} -eq 0 ]; then
        FAILED_TESTS=("Unknown test")
    fi
else
    FAILED_TESTS=("No log file found")
fi

# Create grep pattern for re-running tests
if [ ${#FAILED_TESTS[@]} -gt 1 ]; then
    GREP_PATTERN=$(IFS='|'; echo "${FAILED_TESTS[*]}")
else
    GREP_PATTERN="${FAILED_TESTS[0]}"
fi

echo "Re-run command: npx nx e2e project --grep=\"$GREP_PATTERN\""
```

## Key Takeaways

1. **Always use `set -o pipefail`** when you need to catch failures in pipelines
2. **Capture exit codes with `$?`** immediately after commands
3. **Use multiple fallback methods** for robust text extraction
4. **Test file existence** before processing with `[ -f filename ]`
5. **Handle arrays safely** with proper quoting: `"${array[@]}"`
6. **Avoid `printf` with user data** that might start with dashes
7. **Use `2>&1`** to capture both stdout and stderr in logs
8. **Chain commands with pipes** for powerful text processing

## Test Operators and Conditionals

### String Testing with `[ -z ]`
```bash
# Check if variable is empty (zero length)
if [ -z "$variable" ]; then
    echo "Variable is empty or unset"
fi

# Check if variable is NOT empty
if [ -n "$variable" ]; then
    echo "Variable has content"
fi
```

### Common Test Operators
| **Operator** | **Meaning** | **Example** |
|--------------|-------------|-------------|
| `-z "$var"` | String is empty | `[ -z "" ]` → true |
| `-n "$var"` | String is NOT empty | `[ -n "hello" ]` → true |
| `-f "$file"` | File exists | `[ -f "test.txt" ]` → true if file exists |
| `-d "$dir"` | Directory exists | `[ -d "folder" ]` → true if directory exists |
| `"$a" = "$b"` | Strings are equal | `[ "$name" = "John" ]` → true if equal |

### Find Command with Depth Control
```bash
# Search at specific depth levels to avoid unwanted matches
find e2e -mindepth 2 -maxdepth 2 -name "$folder_name" -type d | head -1

# Parameters explained:
# -mindepth 2: Start searching at depth 2 (skip e2e/group/)
# -maxdepth 2: Stop searching at depth 2 (only look at e2e/group/project/)
# -name: Search by name pattern
# -type d: Only find directories
# | head -1: Take only the first match
```

### Practical Example: Project Folder Detection
```bash
# Remove prefix from project name
folder_name=$(echo "$project" | sed 's/^e2e-//')

# Find project folder at second level (avoids group folder conflicts)
e2e_project_path=$(find e2e -mindepth 2 -maxdepth 2 -name "$folder_name" -type d | head -1)

# Check if folder was found
if [ -z "$e2e_project_path" ]; then
    echo "Project folder not found"
    exit 1
fi
```

## Useful References

- [Bash Manual](https://www.gnu.org/software/bash/manual/)
- [grep Manual](https://www.gnu.org/software/grep/manual/grep.html)
- [sed Manual](https://www.gnu.org/software/sed/manual/sed.html)
- [Advanced Bash Scripting Guide](https://tldp.org/LDP/abs/html/)
