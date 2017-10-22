class Video {
    constructor(file, datetime, location, memo) {
        this.file = file;
        this.datetime = datetime;
        this.location = location;
        this.memo = memo;
    }

    check() {
        let errors = [];
        if (this.file == null || this.file == '') {
            errors.push('File is empty.');
        }
        if (this.datetime == null || this.datetime == '') {
            errors.push('Datetime is empty.')
        }
        if (this.location == null || this.location.constructor.name !== "Location") {
            errors.push('Location is empty.');
        } else {
            let locationErrors = this.location.checkLocation();
            for (let i = 0; i < locationErrors.length; i++) {
                errors.push(locationErrors[i]);
            }
        }
        if (this.memo == null) {
            this.memo = '';
        }
        return errors;
    }

    json() {
        return {
            "lat": this.location.lat,
            "lng": this.location.lng,
            "path": this.file,
            "time": this.datetime,
            "memo": this.memo
        }
    }
}

module.exports = Video;