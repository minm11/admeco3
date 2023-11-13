
export const msalConfig = {
    auth: {
      clientId: "6a3fcc61-4be4-485a-b042-cf7e6885d8ae",
      
      authority: "https://login.microsoftonline.com/stamaria.sti.edu.ph",
    },
    cache: {
      cacheLocation: "sessionStorage", // or 'localStorage'
    },
  };
  
  export const loginRequest = {
    scopes: ["profile", "user.read", "email", "offline_access", "openid"],
  };