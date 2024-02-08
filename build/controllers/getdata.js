"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getdata = void 0;
const axios_1 = __importDefault(require("axios"));
const getdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let responseData = {};
        let OffersData;
        const headers = {
            'X-Forwarded-For': req.headers['x-forwarded-for'],
            'content-type': req.headers['content-type']
        };
        OffersData = yield axios_1.default.post('https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers', {
            Platform: 'web',
            IsTiering: true
        }, { headers });
        responseData.OffersDate = OffersData.data;
        return res.status(200).json(responseData);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.getdata = getdata;
