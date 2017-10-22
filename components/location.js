class Location {
    constructor(address, lat, lng) {
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }

    checkLocation() {
        let errors = [];
        if (this.address == null || this.address == '') {
            errors.push('Address is empty.');
        }
        if (this.lat == null || isNaN(parseFloat(this.lat))) {
            errors.push('Address latitude is wrong.');
        }
        if (this.lng == null || isNaN(parseFloat(this.lng))) {
            errors.push('Address longitude is wrong.');
        }
        return errors;
    }
}

module.exports = Location;