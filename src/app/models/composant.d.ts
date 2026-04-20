type Composant = {
  id: number;
  name: string;
  serialNumber: string;
  tags: Tag[];
  loaner?: AppUser;
};
