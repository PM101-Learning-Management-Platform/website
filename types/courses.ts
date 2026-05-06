export type Course = {
  id: string,
  title: string,
  description: string,
  adminId: string,
  thumbnailUrl: string | null,
  duration: number,
  level: string,
  price: number,
  lessons: [],
  studentsCount: number,
  rating: number,
  createdAt: string,
  updatedAt: string
}
