const Mirn = require('./mirn-class.js').Mirn;
const cal = require('./process.js');

let a = new Mirn('5260000000');

function main() {

    try {
        cal.validate_mirn(a.mirn);
        a.market = cal.setMarket(a.mirn);
        a.jurisdiction = cal.setJurisdiction(a.mirn);
        a.distributor = cal.setDistributor(a.mirn);
        if (a.mirn.length === 11) {
            a.checksum = a.mirn.charAt(a.mirn.length - 1);
        } else {
            a.checksum = cal.check_sum(a.mirn);
        }

        a.logical = cal.setPhysical(a.mirn);
        a.physical = cal.setLogical(a.mirn);
        console.log(a);
        console.log(a.displayStandardForm());
        console.log(a.displayWithoutCheckSum());
        console.log(a.displayPrettyForm());

    } catch (e) {
        console.error("Something went wrong.");
    }

}

main();



