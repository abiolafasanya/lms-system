interface fetchDoc {
  url: string;
  config: any;
};

export const fetcher = ({ url, config }: fetchDoc) => {
  const res = fetch(url, config);
  new Promise((resolve, reject) => {
    resolve(res);
    reject(new Error('Could not process request successfully'));
  });
}
