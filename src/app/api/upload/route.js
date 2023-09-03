import { NextResponse } from "next/server"
import { writeFile } from 'fs/promises'
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dyety2oic',
    api_key: '149544116467755',
    api_secret: 'BGuWPg5t548k8ccyIipc0Us2Mhg'
});




export async function POST(request) {



    const data = await request.formData();
    const image = data.get('image');

    if (!image) {
        return NextResponse.json('no se ha subido una imagen', { status: 400 });
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // guardo archivo
    //const filePath = path.join(process.cwd(), "public", image.name);
    //console.log(filePath)
    //await writeFile(filePath, buffer)

    const respuesta = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        }).end(buffer)
    });




    return NextResponse.json({
        message: "image upload",
        url: respuesta.secure_url
    })
}