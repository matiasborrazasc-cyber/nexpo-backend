import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import storesRoutes from '../app/stores/routes/storesRoutes';
import uploadRoutes from '../app/upload/routes/uploadRoutes';
import influencerRoutes from '../app/influencer/routes/influencerRoutes';
import { redirectByLink } from '../app/influencer/controllers/influencerRedirector';
import userRoutes from '../app/users/routes/usersRoutes';
import userFair from '../app/usersFair/routes/usersFairRoutes';
import articlesRoutes from '../app/articles/routes/articlesRoutes';
import bannerPublicityRoutes from '../app/bannerPublicity/routes/bannerPublicityRoutes';
import bannerPublicityViewsRoutes from '../app/bannerPublicityViews/routes/bannerPublicityViewsRoutes';
import adminRoutes from '../app/admin/routes/adminRoutes';
import sponsorsRoutes from '../app/sponsors/routes/sponsorsRoutes';
import speakersRoutes from '../app/speakers/routes/speakerRoutes';
import cuponsRoutes from '../app/cupons/routes/cuponsRoutes';
import eventCalendarRoutes from '../app/eventCalendar/routes/eventCalendarRoutes';
import giveawaysRoutes from '../app/giveaways/routes/giveawaysRoutes';
import products from '../app/products/routes/productsRoutes';
import productsCategoriesRoutes from '../app/productsCategories/routes/productsCategoriesRoutes';
import matchUsersRoutes from '../app/matchUsers/routes/matchUsersRoutes';
import messagesRoutes from '../app/messages/routes/messagesRoutes';
import fairConfigRoutes from '../app/fairConfig/routes/fairConfigRoutes';
import dashboardRoutes from '../app/dashboard/routes/dashboardRoutes';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

        this.app.use('/api/test', (req, res) => {
            res.status(200).json({ message: 'El servidor está funcionando correctamente' });
        });

        // URL bonita para influencers: /influencers/:link (sin /api)
        this.app.get('/influencers/:link', redirectByLink);

        this.app.use('/api/stores', storesRoutes);
        this.app.use('/api/upload', uploadRoutes);
        this.app.use('/api/influencers', influencerRoutes);
        this.app.use('/api/users/fair', userFair);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/articles', articlesRoutes);
        this.app.use('/api/bannerPublicity', bannerPublicityRoutes);
        this.app.use('/api/bannerPublicityViews', bannerPublicityViewsRoutes);
        this.app.use('/api/admin', adminRoutes);
        this.app.use('/api/sponsors', sponsorsRoutes);
        this.app.use('/api/speakers', speakersRoutes);
        this.app.use('/api/cupons', cuponsRoutes);
        this.app.use('/api/events', eventCalendarRoutes);
        this.app.use('/api/giveaways', giveawaysRoutes);
        this.app.use('/api/products', products);
        this.app.use('/api/products-categories', productsCategoriesRoutes);
        this.app.use('/api/match-users', matchUsersRoutes);
        this.app.use('/api/messages', messagesRoutes);
        this.app.use('/api/config', fairConfigRoutes);
        this.app.use('/api/dashboard', dashboardRoutes);
    }

    async listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }

}

export default Server;