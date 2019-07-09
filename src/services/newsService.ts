import NewsRepository from '../repositories/newsRepository';

class NewsService {
    getAll(actualPage = 1, pageSize = 10) {
        return NewsRepository.find().sort({ publishDate: -1 })
            .skip((actualPage - 1) * pageSize)
            .limit(pageSize);
    }

    getById(_id: Number) {
        return NewsRepository.findById(_id);
    }

    create(news) {
        return NewsRepository.create(news);
    }

    update(_id: Number, news) {
        return NewsRepository.findByIdAndUpdate(_id, news);
    }

    delete(_id: Number) {
        return NewsRepository.findByIdAndRemove(_id);
    }
}

export default new NewsService();