import { createClient } from "@supabase/supabase-js"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uc3Z5aW5waGh6eHN3a3hybW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjUwNTMsImV4cCI6MjA5ODcwMTA1M30.b4jVmgHD4is2zHu85iSuX8o-rSQHTKgmfwSyRQvcj4U"
const supabaseUrl = "https://mnsvyinphhzxswkxrmma.supabase.co/rest/v1/"

const supabase = createClient(supabaseUrl , supabaseKey)

export default function uploadFile(file){
    return new Promise(
        (resolve, reject)=>{

            if(file == null){
                reject("No file provided")
                return
            }

            const timestamp = new Date().getTime()
            const fileName = timestamp + "-" + file.name

            supabase.storage.from("images").upload(fileName , file , {
                upsert: false,
                cacheControl: 3600
            }).then(
                ()=>{
                  const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                  resolve(url)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file")
                }
            )
        }
    )

}