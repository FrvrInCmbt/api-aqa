const axios = require("axios")
const { BaseController } = require("./BaseController")

class CarsController extends BaseController{
    constructor(){
        super()
        this.API_CARS_BRAND = "/cars/brands"
        this.API_CARS = "/cars"
        this.API_CAR_ID = "/cars/{id}"
    }

    async getCarsBrand(){
        return this.get(this.API_CARS_BRAND)
    }

    async getUserCars(){
        return this.get(this.API_CARS)
    }

    async addCar(carBrandId, carModelId, mileage){
        return this.post(this.API_CARS, {
            carBrandId,
            carModelId,
            mileage
        })
    }

    async deleteCarById(id){
        return this.delete(this.API_CAR_ID.replace(`{id}`, id))
    }
}

module.exports.CarsController = CarsController