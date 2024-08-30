import {Before, setParallelCanAssign} from "@cucumber/cucumber";
import IBigCommerceQavajsConfig from "../../IBigCommerceQavajsConfig";
import CustomersApi from "../api/CustomersApi";
import B2bEditionApi from "../api/B2bEditionApi";
import PromotionsApi from "../api/PromotionsApi";
import {atMostOnePicklePerTag} from "@cucumber/cucumber/lib/support_code_library_builder/parallel_can_assign_helpers";

setParallelCanAssign(atMostOnePicklePerTag(['@parallelDisabled']));
Before({name: 'Init BigCommerce APIs'}, function (this: IBigCommerceQavajsConfig) {
  this.config.bigCommerce.customersApi = new CustomersApi(this);
  this.config.bigCommerce.b2bEditionApi = new B2bEditionApi(this);
  this.config.bigCommerce.promotionsApi = new PromotionsApi(this);
})