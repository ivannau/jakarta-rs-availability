import fetch from "isomorphic-unfetch";

const rumahSakitEndpoint = "https://covidanjing.serverkenceng.net/rs";

const getRumahSakit = async () => {
  const payload = await fetch(rumahSakitEndpoint);
  const json = await payload.json();
  console.log(json.length);
  return json;
};

export { getRumahSakit };
