module.exports = app => {
    const controller = app.controllers.pricetagDevices;

    app.route('/api/v1/pricetagdevices').get(controller.listPricetagDevicesDB);
}
