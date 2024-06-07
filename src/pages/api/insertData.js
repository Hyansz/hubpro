const { sql } = require("@vercel/postgres");

export default async function getData(req,res) {
    try {
        
        if(req.method !== "POST") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {name, website, komentar} = req.body
        
        const {rows} = await sql`
            INSERT INTO komentar (name, website, komentar)
            VALUES (${name}, ${website}, ${komentar})
        `

        res.status(200).json({message:"Success", data:rows})
    } catch(error){
        console.log("Error ditemukan: ", error)
        return res.status(500).json({message: "Error ditemukan"})
    }
}