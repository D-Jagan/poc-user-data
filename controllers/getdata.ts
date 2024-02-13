import axios, { AxiosResponse, AxiosError } from 'axios';
import { getRateplanData, getSubcriptionData } from '../Services/subcription';


export const  getdata =  async (req: any,res: any) => {
    try{
        let responseData: any = {};
        const headers = {
            'X-Forwarded-For': req.headers['x-forwarded-for'],
            'content-type': req.headers['content-type']
        }
        const OffersData = await axios.post('https://tiered-pricing-offer-service.ar.dazn-stage.com/v1/offers',{
            Platform: 'web',
            IsTiering: true
        }, {headers})
        const SubscriptionData = await getSubcriptionData(req.body.DaznId);
        const RatePlansData = await getRateplanData(req.body.DaznId);

        console.log(RatePlansData,"sdfdadfadf");
        
        responseData.OffersData = OffersData.data
        responseData.SubscriptionData = SubscriptionData[1] ? SubscriptionData[1] : [];
        responseData.RatePlansData = RatePlansData[1] ? RatePlansData[1]: [];
        return res.status(200).json(responseData);
    }catch(error) {
        return res.json(error)
    } 
}


