// import { createClient } from "@supabase/supabase-js"


// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uc3Z5aW5waGh6eHN3a3hybW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjUwNTMsImV4cCI6MjA5ODcwMTA1M30.b4jVmgHD4is2zHu85iSuX8o-rSQHTKgmfwSyRQvcj4U"
// const supabaseUrl = "https://mnsvyinphhzxswkxrmma.supabase.co"

// const supabase = createClient(supabaseUrl, supabaseKey)

// export default function uploadFile(file){
//     return new Promise(
//         (resolve, reject)=>{

//             if(file == null){
//                 reject("No file provided")
//                 return
//             }

//             const timestamp = new Date().getTime()
//             const fileName = timestamp + "-" + file.name

//             supabase.storage.from("images").upload(fileName , file , {
//                 upsert: false,
//                 cacheControl: 3600
//             }).then(
//                 ()=>{
//                   const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
//                   resolve(url)
//                 }
//             ).catch(
//                 ()=>{
//                     reject("Failed to upload file")
//                 }
//             )
//         }
//     )

// }

// -------------------------------------
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://mnsvyinphhzxswkxrmma.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uc3Z5aW5waGh6eHN3a3hybW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjUwNTMsImV4cCI6MjA5ODcwMTA1M30.b4jVmgHD4is2zHu85iSuX8o-rSQHTKgmfwSyRQvcj4U";

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default async function uploadFile(file) {

//     if (!file) {
//         throw new Error("No file selected");
//     }

//     const timestamp = Date.now();
//     const fileName = `${timestamp}-${file.name}`;

//     const { data, error } = await supabase.storage
//         .from("images")
//         .upload(fileName, file, {
//             cacheControl: "3600",
//             upsert: false,
//         });

//     if (error) {
//     console.log("Supabase upload error:");
//     console.log(error);
//     alert(JSON.stringify(error));
//     throw error;
// }

//     const { data: publicUrlData } = supabase.storage
//         .from("images")
//         .getPublicUrl(fileName);

//     return publicUrlData.publicUrl;
// }

export default async function uploadFile(file) {
  if (!file) {
    throw new Error("No file selected");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://YOUR_BACKEND_URL/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
  return data.url; 
}