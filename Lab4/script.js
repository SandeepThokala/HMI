let triangle = (base, height) => {
    let area = Number.parseFloat(base * height / 2).toFixed(1) 
    console.log(`b = ${base}, h = ${height}: ${area}`);
}
triangle(3, 4)
triangle(5, 7)

let sphere = (radius) => {
    let area = Number.parseFloat((4 * Math.PI * (radius ** 3) / 3).toFixed(1));
    console.log(`r = ${radius}: ${area}`)
}
sphere(3);
sphere(5);

let to_meters = (distance, units) => {
    if (distance != 0 && units != 'm') {
        switch (units) {
            case 'Km':
                console.log(`${distance} Km: ${Number.parseFloat(distance * 1000).toFixed(2)} m`);
                break;
            case 'y':
                console.log(`${distance} y: ${Number.parseFloat(distance * 0.914).toFixed(2)} m`);
                break;
            case 'mi':
                console.log(`${distance} mi: ${Number.parseFloat(distance * 1609.34).toFixed(2)} m`);
                break;
            default:
                break;
        }
    }
}
to_meters(50, 'm');
to_meters(100, 'y');
to_meters(1, 'mi');
to_meters(1.234, 'Km');

let convert_time = (time) => {
    let parts = time.split(':');
    switch (parts.length) {
        case 1:
            console.log(`${time} : ${time} seconds`);
            break;
        case 2:
            console.log(`${time} : ${parts[0] * 60 + Number.parseInt(parts[1])} seconds`);
            break;
        case 3:
            console.log(`${time} : ${parts[0] * 3600 + parts[1] * 60 + Number.parseInt(parts[2])} seconds`);
            break;
        default:
            console.log('Invalid time format');
            break;
    }
}
convert_time('02:33:21');
convert_time('00:04:51');
convert_time('04:51');
convert_time('00:13');
convert_time('13');
