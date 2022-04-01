const LICENSES = require('./lib/LICENSES.js')
const PROBABLY_NOT = require('./lib/PROBABLY_NOT.js')
const MAYBE = require('./lib/MAYBE.js')
const path = require('path')
var fs = require('fs')

function isItComplaining (license, pkgName, packageJson, projectRequirements, warnings) {
    // MAYBE && PROBABLY_NOT requirements
    if (license.tradeMarkUse === PROBABLY_NOT && projectRequirements.tradeMarkUse) {
        if (warnings) console.log('\u001B[33m%s\x1b[0m', `[WARNING] ${pkgName} uses the ${license.name} license which doesn't clearify if trademarkUse is allowed. In most cases it isn't!`)
        return false
    }

    if (license.patentUse === MAYBE && projectRequirements.patentUse) {
        if (warnings) console.log('\u001B[33m%s\x1b[0m', `[WARNING] ${pkgName} uses the ${license.name} license which doesn't clearify if patentUse is allowed. In most cases it is!`)
    }

    if (license.licenseChangesMustBeDocumented === MAYBE && !projectRequirements.licenseChangesMustBeDocumented) {
        if (warnings) console.log('\u001B[33m%s\x1b[0m', `[WARNING] ${pkgName} uses the ${license.name} license which doesn't clearify if you have to document license changes. In most cases you have to!`)
    }

    // Normal requirements
    if (projectRequirements.commercialUse && !license.commercialUse) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} has a non-commercial license: ${license.name}`)
        return true
    }

    if (projectRequirements.modifications && !license.modifications) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} has a non-modification license: ${license.name}`)
        return true
    }

    if (projectRequirements.distribution && !license.distribution) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} has a non-distribution license: ${license.name}`)
        return true
    }

    if (projectRequirements.privateUse && !license.privateUse) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} has a non-private-use license: ${license.name}`)
        return true
    }

    if (!projectRequirements.warranty && !license.warranty) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} doesn't give you warranty: ${license.name}`)
        return true
    }

    if (!projectRequirements.liability && !license.liability) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} doesn't give you liability: ${license.name}`)
        return true
    }

    if (projectRequirements.copyrightNotice && license.copyrightNotice) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} needs copyright notice: ${license.name}`)
        return true
    }

    if (!projectRequirements.licenseNotice && license.licenseNotice) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} needs to have the original license included: ${license.name}`)
        return true
    }

    if (projectRequirements.patentUse && !license.patentUse) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} doesn't allow patent use: ${license.name}`)
        return true
    }

    if (!projectRequirements.licenseChangesMustBeDocumented && license.licenseChangesMustBeDocumented) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} wants you to document license changes: ${license.name}`)
        return true
    }

    if (projectRequirements.tradeMarkUse && !license.tradeMarkUse) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} doesn't allow trade mark use: ${license.name}`)
        return true
    }

    if (!projectRequirements.discloseSource && license.discloseSource) {
        console.log('\x1b[31m%s\x1b[0m', `[COMPLAIN] ${pkgName} wants you to make your source code available: ${license.name}`)
        return true
    }

    return false
}

function checkForComplains (license, pkgName, packageJson, projectRequirements, warnings) {
    // Check if license is in dictionary
    if (LICENSES[license]) {
        // License is in dictionary
        return isItComplaining(LICENSES[license], pkgName, packageJson, projectRequirements, warnings)
    } else {
        // License is not in dictionary

        // Check if package has multiple licenses
        if (license.startsWith('(') && license.endsWith(')')) {
            // Package has multiple licenses
            const mllicenses = license.substring(1, license.length - 1).split('or')
            const complainResults = []
            for (let _license of mllicenses) {
                _license = _license.trim()
                
                complainResults.push(checkForComplains(_license, pkgName, packageJson, projectRequirements, warnings))
            }

            if (complainResults.includes(false)) return false // at least one license grants permission
            return true // License complain
        } else {
            // Unknown license
            console.log('\x1b[31m%s\x1b[0m', `${pkgName} has an unknown license: ${license}`)
        }

        return true
    }
    return false
}

function onModuleDirPathsRead (moduleDirPaths, NODEMODULES_PATH, directory, projectRequirements, warnings) {
    let doesSomethingComplain = false
    
    for (const moduleDirPath of moduleDirPaths) {
        const packageJsonPath = path.join(moduleDirPath, 'package.json')
        const packageJson = require(packageJsonPath)
        const licenseUnformatted = packageJson.license
        const pkgName = packageJson.name

        let complains = false

        if (!licenseUnformatted) {
            // Check if package has multiple licenses
            if (packageJson.licenses) {
                // Package has multiple licenses
                const complainResults = []
                for (const _mLicense of packageJson.licenses) {                    
                    complainResults.push(checkForComplains(_mLicense.type.toLowerCase(), pkgName, packageJson, projectRequirements, warnings))
                }

                if (complainResults.includes(false)) {
                    break
                } // at least one license grants permission
                complains = true // License complain
            } else {
                console.log(`${pkgName} has no license`)
            }

            continue
        }

        const license = licenseUnformatted.toLowerCase()

        if (checkForComplains(license, pkgName, packageJson, projectRequirements, warnings)) {
            complains = true
        }

        if (complains) {
            doesSomethingComplain = true
        }
    }

    return doesSomethingComplain
}

const defaultProjectRequirements = {
    commercialUse: true, // True means that you want to use the package in a commercial application
    modifications: true, // True means you want to modify the code of a package
    distribution: true, // True means that you want to distribute the code (Needs to be true if you want to distribute your code)
    privateUse: true, // True means you want to use the package privately
    warranty: false, // True means you are ok with the fact that the dependency doesn't give you warranty
    liability: false, // True means you are ok with the fact that the dependency doesn't give you liability
    copyRightNotice: true, // True means you are ok with including copyright notices
    licenseNotice: true, // True means you are ok with including the original LICENSE file of the package
    patentUse: true, // True means that you want to use the package for patent purposes
    licenseChangesMustBeDocumented: true, // True means that you are ok with documenting the changes in the license (You probably want this to be true in most cases)
    tradeMarkUse: false, // True means that you want to use the trade mark of the package
    discloseSource: true // True means that you are ok with having to make your source code available
}

/**
 * @description Checks if the project complies with the license requirements
 * @param {Object} projectRequirements Object containing the requirements of the project
 * @param {Boolean} warnings If true, the function will print warnings if some licenses might complain
 * @param {Boolean} exitWithCode If true, the process will exit with code 1 if the project doesn't comply with the license requirements
 * @param {String} directory Path to the project root
 */
function check (projectRequirements = defaultProjectRequirements, warnings = true, exitWithCode = true, directory = process.cwd()) {
    const NODEMODULES_PATH = path.join(directory, 'node_modules')
    const moduleDirPaths = []

    const handleReaddirOperation = (err, files) => {
        if (err) throw err
        for (const file of files) {
            if (file === '.bin') continue // skip .bin folder
            if (file === 'node_modules') continue // skip node_modules folder
            if (file === 'package.json') continue // skip package.json
            if (file === 'package-lock.json') continue // skip package-lock.json
            if (file.startsWith('.')) continue // skip hidden files
            if (file.startsWith('@')) {
                // @scoped packages
                let _scoped = fs.readdirSync(path.join(NODEMODULES_PATH, file))
                _scoped = _scoped.filter(f => {
                    if (f.startsWith('@')) return false
                    if (f === 'node_modules') return false
                    if (f === 'package.json') return false
                    if (f === 'package-lock.json') return false
                    if (f === '.bin') return false
                    if (f.startsWith('.')) return fals // skip hidden files
                    return true
                })

                for (const _scopedpkg of _scoped) {
                    moduleDirPaths.push(path.join(NODEMODULES_PATH, file, _scopedpkg))
                }

                continue
            }

            moduleDirPaths.push(path.join(NODEMODULES_PATH, file)) // add module directory path
        }

        const complains = onModuleDirPathsRead(moduleDirPaths, NODEMODULES_PATH, directory, projectRequirements, warnings)

        if (complains) {
            console.log('Something complains!')
            if (exitWithCode) process.exit(1)
        } else {
            console.log('Everything is ok, no complains detected!')
            if (exitWithCode) process.exit(0)
        }
    }

    fs.readdir(NODEMODULES_PATH, handleReaddirOperation)
}

module.exports = {
    check
}