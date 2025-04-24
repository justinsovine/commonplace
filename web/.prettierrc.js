module.exports = {
    tabWidth: 4, // Set tabs to be 4 spaces wide
    useTabs: false, // Use spaces instead of actual tab characters
    semi: true, // Add semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double quotes
    jsxSingleQuote: true, // Use single quotes in JSX
    trailingComma: 'es5', // Use trailing commas where valid in ES5
    bracketSpacing: true, // Print spaces between brackets in object literals
    bracketSameLine: false, // Put the > of a multi-line JSX element at the end of the last line
    arrowParens: 'avoid', // Avoid parentheses around a sole arrow function parameter
    printWidth: 100, // Line length where Prettier will try to wrap
    endOfLine: 'lf', // Line Feed only (\n), common in Linux and macOS
    overrides: [
        {
            files: '*.{js,jsx}',
            options: {
                parser: 'babel',
            },
        },
        {
            files: '*.{ts,tsx}',
            options: {
                parser: 'typescript',
            },
        },
    ],
};
