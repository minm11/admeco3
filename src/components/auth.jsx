
export const msalConfig = {
    auth: {
      clientId: "4726ba85-7101-44dd-a14c-72b34be18d25",
      
      authority: "https://login.microsoftonline.com/stamaria.sti.edu.ph",
    },
    cache: {
      cacheLocation: "sessionStorage", // or 'localStorage'
    },
  };
  
  export const loginRequest = {
    scopes: ["profile", "user.read", "email", "offline_access", "openid"],
  };