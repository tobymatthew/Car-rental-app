import request from 'request'
import imageToBase64 from 'image-to-base64';



export async function verify_liscence_plate(plate_number){

    const options = {
    'method': 'POST',
    'url': 'https://api.myidentitypay.com/api/v2/biometrics/merchant/data/verification/vehicle',
    'headers': {
        'x-api-key': process.env.SENDBLUE_API_KEY,
        'app-id': '328c4d27-b2ca-42c7-b9a8-f672561f0224',
        'Cookie': 'cookiesession1=678A3E69197210AE369EA1D24C9C2D44'
    },
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(JSON.parse(response.body).status);
    });
}


export async function verify_drivers_liscence(){
    const options = {
    'method': 'POST',
    'url': 'https://api.myidentitypay.com/api/v2/biometrics/merchant/data/verification/drivers_license/advance',
    'headers': {
        'x-api-key': process.env.SENDBLUE_API_KEY,
        'app-id': '328c4d27-b2ca-42c7-b9a8-f672561f0224',
        'Cookie': 'cookiesession1=678A3E69197210AE369EA1D24C9C2D44'
    },
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(JSON.parse(response.body));
    });
}




export function verify_phone_number(phone_number){
	const options = {
	'method': 'POST',
	'url': 'https://api.myidentitypay.com/api/v2/biometrics/merchant/data/verification/phone_number',
	'headers': {
		'x-api-key': process.env.SENDBLUE_API_KEY,
		'app-id': '328c4d27-b2ca-42c7-b9a8-f672561f0224',
		'Cookie': 'cookiesession1=678A3E69197210AE369EA1D24C9C2D44'
	},
	formData: {'number': phone_number}
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(JSON.parse(response.body).status);
	});


}
