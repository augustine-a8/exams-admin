export type ISignature = {
  _id: string;
  imageUrl: string;
  user: {
    _id: string;
    name: string;
    category: string;
  };
  room: {
    _id: string;
    name: string;
  };
  session: number;
  duration: number;
  signedAt: string;
};
