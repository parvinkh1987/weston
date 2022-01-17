class Mirn {
    constructor(mirn) {
        this.mirn = mirn;
    }

    market
    jurisdiction
    distributor
    physical
    logical
    checksum

    displayStandardForm() {
        let new_char = this.mirn + this.checksum;
        return `standardised form 11 digit ${new_char}`;
    }

    displayWithoutCheckSum() {
        return `without a checksum ${this.mirn}`;
    }

    displayPrettyForm() {
        return `pretty form 11 digit ${this.mirn}/${this.checksum}`;
    }
}

module.exports = {Mirn};

