'use client';

import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";




const authenticator = async()=>{
  try{
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if(!response?.ok){
      const errorText = await response?.text();
      throw new Error("Request failed with status "+response?.status + ":" + errorText)
    }
    const data = await response.json();
    const {signature,expire,token} = data;
    return {
      token,
      expire,
      signature
    }
  }catch(error){
    throw new Error(`Authentication failed ${error instanceof Error ?  error?.message : 'something went wrong' }`)
  }
}

interface IProps{
  onFileChange:(filePath:string)=>void;
}

const ImageUpload = ({onFileChange}:IProps) => {
  const ikUploadRef = useRef(null);
  const [file,setFile] = useState<{filePath:string} | null>(null);
  const {toast} = useToast();
    const onError = (error:any)=>{
      console.log(error);
      toast({
        title:"Image uploaded failed",
        description:`Your image could not be uploaded. please try again`,
        variant:'destructive'
      })
    }
    const onSuccess = (res:any)=>{ 
      setFile(res)
      onFileChange(res?.filePath);
      toast({
        title:"Image uploaded successfully",
        description:`${res?.filePath} uploaded successfully`
      })
    }
  return (
    <ImageKitProvider publicKey={config.env.imageKit.publicKey} urlEndpoint={config.env.imageKit.urlEndpoint} authenticator={authenticator}>
       <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
       />
       <button className="upload-btn" onClick={(e)=>{
        e.preventDefault();
        if(ikUploadRef.current){
          //@ts-ignore
          ikUploadRef.current?.click();
        }
       }}>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} 
        height={20} className="object-contain"/>
        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file?.filePath}</p>}
       </button>
       {file && (
        <IKImage 
          alt={file?.filePath}
          path={file?.filePath}
          width={500}
          height={500}

        />
       )}
    </ImageKitProvider>
  )
}

export default ImageUpload