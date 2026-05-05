export type Course = {
  id: string,
  title: string,
  description: string,
  adminId: string,
  thumbnailUrl: string | null,
  duration: number,
  level: string,
  price: number,
  createdAt: string,
  updatedAt: string
}