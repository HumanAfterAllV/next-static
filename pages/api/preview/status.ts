import { NextApiHandler } from 'next'

const PreviewStatus: NextApiHandler = (request, response) => {
  response.json({
    preview: request.preview ?? false,
    context: request.previewData,
  })
}

export default PreviewStatus