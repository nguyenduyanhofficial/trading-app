export const setCookie = (name, value, hours = 8) => {
  const maxAge = hours * 60 * 60;
  console.log(`Setting cookie with max-age: ${maxAge} seconds`);

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; max-age=${maxAge}; path=/; Secure; SameSite=Strict`;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((c) => c.trim().startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
