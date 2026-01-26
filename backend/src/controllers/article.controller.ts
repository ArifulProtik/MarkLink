import { CreatePost, DeletePost, GetPostBySlug, GetPosts, UpdatePost } from "@/services/article.service.ts"
import { CreatePostBody, GetPostsQuery, UpdatePostBody } from "@/shared/article.model.ts"
import { Controller } from "./controller.ts"

Controller.group("/article", (p) => {
  p.post(
    "/",
    async ({ body, user }) => await CreatePost(body, user),
    {
      body: CreatePostBody,
      isAuth: true,
    },
  )

  p.get("/", async ({ query }) => await GetPosts(query), {
    query: GetPostsQuery,
  })

  p.get("/:slug", async ({ params: { slug } }) => await GetPostBySlug(slug))

  p.put(
    "/:id",
    async ({ params: { id }, body, user }) => await UpdatePost(id, body, user),
    {
      body: UpdatePostBody,
      isAuth: true,
    },
  )

  p.delete(
    "/:id",
    async ({ params: { id }, user }) => await DeletePost(id, user),
    {
      isAuth: true,
    },
  )

  return p
})
