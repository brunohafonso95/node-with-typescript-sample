import * as redis from 'redis';

import NewsService from '../services/newsService';
import Response from '../utils/response';
import ExportFiles from '../lib/exportFiles';

class NewsController {
    get(req, res) {
        let client;
        if (process.env.DOCKER_ENV) {
            client = redis.createClient(6379, 'redis');
        }


        client = redis.createClient();
        client.get('news', (err, reply) => {
            if (reply) {
                return Response.defaultResponse(res, { news: JSON.parse(reply) })
            }

            let { page, pagesize } = req.query;
            page = page ? parseInt(page) : 1;
            pagesize = pagesize ? parseInt(pagesize) : 10;

            NewsService.getAll(page, pagesize)
                .then(news => {
                    client.set('news', JSON.stringify(news));
                    client.expire('news', 20);
                    Response.defaultResponse(res, { news })
                })
                .catch(error => Response.errorResponse(res, { errorMessage: `error to get news - ${error.message}` }));
        });
    }

    async exportCsv(req, res) {
        try {
            const newsList = await NewsService.getAll();
            const fields = [
                '_id',
                'hat',
                'title',
                'text',
                'author',
                'img',
                'publishDate',
                'link',
                'active'
            ];
            const csv = ExportFiles.toCsv(newsList, fields);
            const fileName = ExportFiles.saveCsvFile('./exports', csv);
            res.redirect(`/exports/${fileName}`);
        } catch (error) {
            Response.errorResponse(res, { errorMessage: `error to export file - ${error.message}` });
        }
    }

    getById(req, res) {
        NewsService.getById(req.params.id)
            .then(newsItem => {
                if (!newsItem) {
                    return Response.defaultResponse(res, { errorMessage: 'new not found' }, 404);
                }

                Response.defaultResponse(res, { newsItem });
            })
            .catch(error => Response.errorResponse(res, { errorMessage: `error to get new - ${error.message}` }));
    }

    async create(req, res) {
        NewsService.create(req.body)
            .then(newCreated => Response.defaultResponse(res, { newCreated }, 201))
            .catch(error => Response.errorResponse(res, { errorMessage: `error to create new - ${error.message}` }));
    }

    async update(req, res) {
        NewsService.update(req.params.id, req.body)
            .then(() => Response.defaultResponse(res, { message: 'new updated with success' }))
            .catch(error => Response.errorResponse(res, { errorMessage: `error to update new - ${error.message}` }));
    }

    async delete(req, res) {
        NewsService.delete(req.params.id)
            .then(() => Response.defaultResponse(res, '', 204))
            .catch(error => Response.errorResponse(res, { errorMessage: `error to delete new - ${error.message}` }));
    }
}

export default new NewsController();