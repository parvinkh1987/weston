function validate_mirn(mirn) {

    let pattern = /^[0-9]{10,11}$/;

    if (!pattern.test(mirn)) {
        throw new TypeError(`invalid input mirn`);
    }
    return mirn;
}

function setMarket(mirn) {
    let digit_one = mirn[0];
    let market;
    switch (digit_one) {
        case '2':
            market = 'CTM (NSW that are operated from VIC)';
            break;
        case '3':
            market = 'CTM (VIC)';
            break;
        case '4':
            market = 'CTM (QLD)';
            break;
        case '5':
            market = 'Gas Market';
            break;
        default:
            // console.log('out of range');
            market = 'unknown';
    }

    return market;
}

function setJurisdiction(mirn) {
    let digit_two = mirn[1];
    let jurisdiction;
    switch (digit_two) {
        case '2':
            jurisdiction = 'NSW/ACT';
            break;
        case '3':
            jurisdiction = 'Victoria';
            break;
        case '4':
            jurisdiction = 'Queensland';
            break;
        case '5':
            jurisdiction = 'South Australia';
            break;
        default:
            // console.log('out of range');
            jurisdiction = 'unknown';
    }

    return jurisdiction;
}

function setDistributor(mirn) {
    let digit_two = mirn[1];
    let digit_three = mirn[2];
    let distributor;
    if (digit_three === '0') {
        distributor = 'AEMO';
        return distributor;
    }
    if (digit_two === '2') {
        switch (digit_three) {
            case '2':
                distributor = 'Australian Gas Networks (Albury NSW), formerly Stratus';
                break;
            case '4':
                distributor = 'Jemena Gas Networks';
                break;
            case '5':
                distributor = 'Australian Gas Networks (Wagga Wagga NSW)';
                break;
            case '6':
                distributor = 'ActewAGL Distribution';
                break;
            case '7':
                distributor = 'Central Ranges Pipeline';
                break;
            default:
                // console.log('out of range');
                distributor = 'unknown';
        }
    } else if (digit_two === '3') {
        switch (digit_three) {
            case '1':
                distributor = 'Multinet Gas';
                break;
            case '2':
                distributor = 'Australian Gas Networks';
                break;
            case '3':
                distributor = 'Ausnet Services';
                break;
            default:
                // console.log('out of range');
                distributor = 'unknown';
        }

    } else if (digit_two === '4') {
        switch (digit_three) {
            case '1':
                distributor = 'lgas Energy';
                break;
            case '2':
                distributor = 'Australian Gas Networks';
                break;
            default:
                // console.log('out of range');
                distributor = 'unknown';
        }

    } else if (digit_two === '5') {
        switch (digit_three) {
            case '1':
                distributor = 'Australian Gas Networks (General)';
                break;
            case '4':
                distributor = 'Australian Gas Networks (Mildura)';
                break;
            default:
                // console.log('out of range');
                distributor = 'unknown';
        }

    }
    return distributor;
}

function setPhysical(mirn) {
    let jurisdiction = setJurisdiction(mirn);
    if (jurisdiction === 'Victoria' || jurisdiction === 'Queensland') {
        if (jurisdiction === 'Victoria') {
            if (mirn[8] === 'P') {
                return 'physical';
            } else {
                return 'unknown';
            }
        }

        if (jurisdiction === 'Queensland') {
            if (mirn[8] === 'P' && mirn[9] === 'C') {
                return 'physical';
            } else {
                return 'unknown';
            }
        }

    } else {
        return 'unknown';
    }
}

function setLogical(mirn) {
    let jurisdiction = setJurisdiction(mirn);
    if (jurisdiction === 'Victoria' || jurisdiction === 'Queensland') {
        if (jurisdiction === 'Victoria') {
            if (mirn[8] === 'L') {
                return 'logical';
            } else {
                return 'unknown';
            }
        }

        if (jurisdiction === 'Queensland') {
            if (mirn[8] === 'L' && mirn[9] === 'C') {
                return 'logical';
            } else {
                return 'unknown';
            }
        }

    } else {
        return 'unknown';
    }
}

function check_sum(mirn) {

    let total = 0;
    let check_sum = 0;
    for (let i = 0; i < mirn.length; i++) {
        let double_Char;
        if (i % 2 === 0) {
            double_Char = true;
        } else {
            double_Char = false;
        }

        let char = mirn.charAt((mirn.length - 1) - i);

        let ascii_char = char.charCodeAt(0);

        let double_value;
        if (double_Char === true) {
            double_value = ascii_char * 2;
        } else {
            double_value = ascii_char;
        }

        let output = [];

        while (double_value) {
            output.push(double_value % 10);
            double_value = Math.floor(double_value / 10);
        }
        output.map(digit => {
            total += digit;
        });
        check_sum = (((Math.ceil(total / 10)) * 10) - total);
    }
    if (check_sum === 10) {
        check_sum = 0;
    }
    return check_sum;
}

module.exports = {validate_mirn, setMarket, setJurisdiction, setDistributor, check_sum, setPhysical, setLogical};