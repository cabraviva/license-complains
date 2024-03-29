const MAYBE = require('./MAYBE.js')
const PROBABLY_NOT = require('./PROBABLY_NOT.js')

const LICENSES = {
    'mit': {
        'name': 'MIT',
        'url': 'https://opensource.org/licenses/MIT',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false,
        'allowsClosedSource': true
    },
    'isc': {
        'name': 'ISC',
        'url': 'https://opensource.org/licenses/ISC',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false,
        'allowsClosedSource': true
    },
    'unlicense': {
        'name': 'The Unlicense',
        'url': 'https://opensource.org/licenses/unlicense',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': false,
        'licenseNotice': false,
        'patentUse': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false,
        'allowsClosedSource': true
    },
    'bsl-1.0': {
        'name': 'Boost Software License 1.0',
        'url': 'https://opensource.org/licenses/BSL-1.0',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': MAYBE,
        'licenseChangesMustBeDocumented': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false
    },
    'apache-2.0': {
        'name': 'Apache License 2.0',
        'url': 'https://opensource.org/licenses/Apache-2.0',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': true,
        'licenseChangesMustBeDocumented': true,
        'tradeMarkUse': false,
        'discloseSource': false
    },
    'bsd-3-clause': {
        'name': 'BSD 3-Clause "New" or "Revised" License',
        'url': 'https://opensource.org/licenses/BSD-3-Clause',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': MAYBE,
        'licenseChangesMustBeDocumented': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false
    },
    'wtfpl': {
        'name': 'Do What The Fuck You Want To Public License',
        'url': 'https://opensource.org/licenses/WTFPL',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': false,
        'licenseNotice': false,
        'patentUse': true,
        'licenseChangesMustBeDocumented': false,
        'tradeMarkUse': true,
        'discloseSource': false,
        'allowsClosedSource': true
    },
    'afl-2.1': {
        'name': 'Academic Free License v2.1',
        'url': 'https://opensource.org/licenses/AFL-2.1',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': true,
        'licenseChangesMustBeDocumented': false,
        'tradeMarkUse': false,
        'discloseSource': false
    },
    'bsd-2-clause': {
        'name': 'BSD 2-Clause "Simplified" License',
        'url': 'https://opensource.org/licenses/BSD-2-Clause',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': MAYBE,
        'licenseChangesMustBeDocumented': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false
    },
    'gpl-3.0': {
        'name': 'GNU General Public License v3.0',
        'url': 'https://opensource.org/licenses/GPL-3.0',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyRightNotice': true,
        'licenseNotice': true,
        'patentUse': true,
        'licenseChangesMustBeDocumented': true,
        'tradeMarkUse': false,
        'discloseSource': true,
        'allowsClosedSource': false,
        'projectNeedsSameLicense': true
    },
    'gpl-2.0': {
        'name': 'GNU General Public License v2.0',
        'url': 'https://opensource.org/licenses/GPL-2.0',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyRightNotice': true,
        'licenseNotice': true,
        'patentUse': true,
        'licenseChangesMustBeDocumented': true,
        'tradeMarkUse': false,
        'discloseSource': true,
        'allowsClosedSource': false,
        'projectNeedsSameLicense': true
    },
    'lgpl-2.1': {
        'name': 'GNU Lesser General Public License v2.1',
        'url': 'https://opensource.org/licenses/LGPL-2.1',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyRightNotice': true,
        'licenseNotice': true,
        'patentUse': true,
        'licenseChangesMustBeDocumented': true,
        'tradeMarkUse': false,
        'discloseSource': true,
        'allowsClosedSource': false,
        'projectNeedsSameLicense': true
    },
    '0bsd': {
        'name': 'Zero-Clause BSD',
        'url': 'https://opensource.org/licenses/0BSD',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': false,
        'licenseNotice': false,
        'patentUse': MAYBE,
        'tradeMarkUse': PROBABLY_NOT,
        'discloseSource': false,
        'allowsClosedSource': true
    },
    'cc0-1.0': {
        'name': 'Creative Commons Zero v1.0 Universal',
        'url': 'https://opensource.org/licenses/CC0-1.0',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': false,
        'licenseNotice': false,
        'patentUse': false,
        'tradeMarkUse': false,
        'discloseSource': false,
        'allowsClosedSource': true
    },
    'python-2.0': {
        'name': 'Python 2.0',
        'url': 'https://www.python.org/download/releases/2.0/license/',
        'commercialUse': true,
        'modifications': true,
        'distribution': true,
        'privateUse': true,
        'warranty': false,
        'liability': false,
        'copyrightNotice': true,
        'licenseNotice': true,
        'patentUse': MAYBE,
        'tradeMarkUse': false,
        'discloseSource': false,
        'allowsClosedSource': true
    },
}

LICENSES.bsd = LICENSES['bsd-3-clause']
LICENSES['gpl-3.0-or-later'] = LICENSES['gpl-3.0']
LICENSES['gpl-3.0-only'] = LICENSES['gpl-3.0']
LICENSES['gpl-2.0-or-later'] = LICENSES['gpl-2.0']
LICENSES['gpl-2.0-only'] = LICENSES['gpl-2.0']

module.exports = LICENSES