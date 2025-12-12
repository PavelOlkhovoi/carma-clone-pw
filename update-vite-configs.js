const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Find all vite.config.ts files
const viteConfigs = execSync(
  'find . -name "vite.config.ts" -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.nx/*"',
  {
    cwd: __dirname,
    encoding: "utf-8",
  }
)
  .trim()
  .split("\n")
  .filter(Boolean);

console.log(`Found ${viteConfigs.length} vite.config.ts files`);

// Files to skip (already updated or submodules)
const skipFiles = [
  "./libraries/collaboration/carma-wuppertal-collab/vite.config.ts",
  "./libraries/mapping/components/vite.config.ts",
  "./apps/topicmaps/baederkarte/vite.config.ts",
  "./libraries/commons/cismap/vite.config.ts",
  "./libraries/collaboration/carma-wuppertal-collab/wuppertal-collab-submodule/vite.config.ts",
  "./libraries/collaboration/carma-pecher-collab/pecher-collab-submodule/vite.config.ts",
];

viteConfigs.forEach((configPath) => {
  if (skipFiles.includes(configPath)) {
    console.log(`Skipping ${configPath} (already updated or submodule)`);
    return;
  }

  const fullPath = path.join(__dirname, configPath);
  let content = fs.readFileSync(fullPath, "utf-8");

  // Check if already has the import
  if (content.includes("vite.shared.config")) {
    console.log(`Skipping ${configPath} (already has shared config)`);
    return;
  }

  // Calculate relative path to vite.shared.config.ts
  const configDir = path.dirname(fullPath);
  const relativePath = path.relative(
    configDir,
    path.join(__dirname, "vite.shared.config")
  );
  const importPath = relativePath.startsWith(".")
    ? relativePath
    : "./" + relativePath;

  // Add import after the last import statement
  const lastImportMatch = content.match(/import[^;]+;(?=\n\n)/g);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    const importStatement = `import { submoduleRollupOptions } from '${importPath}';`;
    content = content.replace(lastImport, `${lastImport}\n${importStatement}`);
  }

  // Update rollupOptions
  if (content.includes("rollupOptions:")) {
    // Check if it has external array
    if (content.includes("external:")) {
      // Add submodule externals to existing external array
      content = content.replace(
        /external:\s*\[([\s\S]*?)\]/,
        (match, externals) => {
          const trimmed = externals.trim();
          if (trimmed) {
            return `external: [${externals}, ...submoduleRollupOptions.external]`;
          } else {
            return `external: [...submoduleRollupOptions.external]`;
          }
        }
      );

      // Add onwarn if not present
      if (!content.includes("onwarn")) {
        content = content.replace(
          /rollupOptions:\s*{/,
          "rollupOptions: {\n      onwarn: submoduleRollupOptions.onwarn,"
        );
      }
    } else {
      // No external array, add both
      content = content.replace(
        /rollupOptions:\s*{/,
        `rollupOptions: {
      external: [...submoduleRollupOptions.external],
      onwarn: submoduleRollupOptions.onwarn,`
      );
    }
  } else if (content.includes("build:")) {
    // No rollupOptions, add it
    content = content.replace(
      /build:\s*{/,
      `build: {
    rollupOptions: {
      external: [...submoduleRollupOptions.external],
      onwarn: submoduleRollupOptions.onwarn,
    },`
    );
  }

  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`✅ Updated ${configPath}`);
});

console.log("\nDone!");
