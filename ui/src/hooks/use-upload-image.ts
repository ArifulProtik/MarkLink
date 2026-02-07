import { useMutation } from '@tanstack/react-query'
import { api } from '@ui/lib/api'

export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const { data, error } = await api.api.v1.upload.post({
        file,
      })

      if (error) {
        throw error
      }

      return data.image_url
    },
  })
}
