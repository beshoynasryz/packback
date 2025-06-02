function bootstrap(app ,express) {
   
    app.use(express.json());
    
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.send('BNE packback e-commerce API is running');
    });
    


}
export default bootstrap;