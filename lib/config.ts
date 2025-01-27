 const config = {
  env:{
    apiEndpoint:process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imageKit:{
      publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!,
      privateKey:process.env.IMAGEKIT_URL_PRIVATE_KEY!
    }
  }
}

export default config;