const Complains = require('./main.js')

Complains.check({
    commercialUse: true, // True means that you want to use the package in a commercial application
    modifications: true, // True means you want to modify the code of a package
    distribution: true, // True means that you want to distribute the code (Needs to be true if you want to distribute your code)
    privateUse: true, // True means you want to use the package privately
    warranty: true, // True means if you are ok with the fact that the dependency doesn't give you warranty
    liability: true, // True means if you are ok with the fact that the dependency doesn't give you liability
    copyRightNotice: true, // True means you are ok with including copyright notices
    licenseNotice: true, // True means you are ok with including the original LICENSE file of the package
    patentUse: true, // True means that you want to use the package for patent purposes
    licenseChangesMustBeDocumented: true, // True means that you are ok with documenting the changes in the license (You probably want this to be true in most cases)
    tradeMarkUse: false, // True means that you want to use the trade mark of the package
    discloseSource: false // True means that you are ok with having to make your source code available
}, false, true, process.cwd())