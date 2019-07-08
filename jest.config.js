module.exports = {
    testMatch:["**/test/**/*.ts?(x)"],
    transform:{
        ".(ts|tsx)":"ts-jest"
    },
    testEnvironment:'jsdom',
    coverageThreshold: {
        "global": {
            "branches": 80,
            "functions": 80,
            "lines": 80,
            "statements": -10
        }
    },
    // collectCoverage:true,
    coveragePathIgnorePatterns:["/test/","/node_modules/"],
    rootDir:'',
    coverageDirectory:"./docs/js-coverage",
    moduleFileExtensions:['ts','tsx','js']
};
