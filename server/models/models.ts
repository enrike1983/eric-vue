export type NavigationPayload = {
  type: "navigation";
  title: string;
  menuItems: {
    fields: {
      title: string;
      slug: string;
    };
  }[];
};