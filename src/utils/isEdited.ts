export const isEdited = (createdAt: string, updatedAt: string) =>
  new Date(updatedAt).getTime() > new Date(createdAt).getTime();
