/* eslint-disable no-unused-vars */
import { Checkbox, Drawer, Input, Radio, Select } from 'antd';
import { FilterSelect } from './FilterSelect';
import * as constants from '../../utils/constants';

export function FilterDrawer({ open, filterValue, setFilterValue, categoryList, employeeList, additionalOptions, isSalesRanks = false, onOk, onCancel }) {
  let orderTypes = [
    { value: "", label: "-- なし --" },
    ...constants.OrderTypes
  ];
  if (additionalOptions && additionalOptions.orderTypes) {
    orderTypes = [{ value: "", label: "-- なし --" }, ...additionalOptions.orderTypes, ...constants.OrderTypes];
  }

  if (isSalesRanks) {
    orderTypes = orderTypes.filter(item => !item.value.startsWith("sales_count"));
  } else {
    orderTypes = orderTypes.filter(item => !item.value.startsWith("rank_drop"));
  }


  return (
    <Drawer
      title="Filter Range"
      placement={"left"}
      closable={false}
      onClose={onCancel}
      open={open}
      key={"left"}
    >
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>項目</div>
          <FilterSelect
            id="order_by_select"
            value={filterValue.order_by_value}
            values={orderTypes}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, order_by_value: e }))
            }
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <div>並び順</div>
          <Radio.Group
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, order_by_way: e.target.value }))
            }
            value={filterValue.order_by_way}
          >
            <Radio value={0}>ASC</Radio>
            <Radio value={1}>DESC</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "10px" }}>
          ASIN
          <Input.TextArea
            rows={4}
            id="filter_multi_asins"
            value={filterValue.filter_multi_asins}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, filter_multi_asins: e.target.value }))
            }
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          ランキング
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                suffix="位"
                style={{ width: "130px" }}
                id="filter_us_min_rank"
                value={filterValue.filter_us_min_rank}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_us_min_rank: e.target.value }))
                }
              />
            </div>
            -
            <div>
              <Input
                suffix="位"
                style={{ width: "130px" }}
                id="filter_us_max_rank"
                value={filterValue.filter_us_max_rank}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_us_max_rank: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          重量
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                suffix="g"
                style={{ width: "130px" }}
                value={filterValue.filter_us_min_weight}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_us_min_weight: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <Input
                suffix="g"
                style={{ width: "130px" }}
                value={filterValue.filter_us_max_weight}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_us_max_weight: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          米国価格
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                prefix="$"
                style={{ width: "130px" }}
                value={filterValue.filter_us_min_price}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_us_min_price: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <Input
                prefix="$"
                style={{ width: "130px" }}
                value={filterValue.filter_us_max_price}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_us_max_price: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          手動価格
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                prefix="¥"
                style={{ width: "130px" }}
                value={filterValue.filter_jp_purchase_min_price}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_jp_purchase_min_price: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <Input
                prefix="¥"
                style={{ width: "130px" }}
                value={filterValue.filter_jp_purchase_max_price}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_jp_purchase_max_price: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          問屋価格
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                prefix="¥"
                style={{ width: "130px" }}
                value={filterValue.filter_jp_seller_min_price}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_jp_seller_min_price: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <Input
                prefix="¥"
                style={{ width: "130px" }}
                value={filterValue.filter_jp_seller_max_price}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_jp_seller_max_price: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          利益額
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                prefix="¥"
                style={{ width: "130px" }}
                value={filterValue.filter_min_profit_amount}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_min_profit_amount: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <Input
                prefix="¥"
                style={{ width: "130px" }}
                value={filterValue.filter_max_profit_amount}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_max_profit_amount: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          利益率
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Input
                suffix="%"
                style={{ width: "130px" }}
                value={filterValue.filter_min_profit_percent}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_min_profit_percent: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <Input
                suffix="%"
                style={{ width: "130px" }}
                value={filterValue.filter_max_profit_percent}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_max_profit_percent: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          発注日
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <input
                type="date"
                className='form-control'
                value={filterValue.filter_start_order_date}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_start_order_date: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <input
                type="date"
                className='form-control'
                value={filterValue.filter_end_order_date}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_end_order_date: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          入荷日
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <input
                type="date"
                className='form-control'
                value={filterValue.filter_start_purchase_date}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_start_purchase_date: e.target.value }))
                }
              />
            </div>{" "}
            -{" "}
            <div>
              <input
                type="date"
                className='form-control'
                value={filterValue.filter_end_purchase_date}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_end_purchase_date: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          商品形態
          <FilterSelect
            id="filter_product_type1_list"
            value={filterValue.filter_product_type1_list}
            values={constants.ProductTypes}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, filter_product_type1_list: e }))
            }
          />
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          米国カテゴリー
          <Select
            id="filter_us_category_list"
            value={filterValue.filter_us_category_list}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, filter_us_category_list: e }))
            }
          >
            <Select.Option value="">-- なし --</Select.Option>
            {
              categoryList && categoryList.map((item, key) =>
                <Select.Option key={key} value={item.s_name}>
                  {item.s_name}
                </Select.Option>)
            }
          </Select>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          発注先
          <FilterSelect
            id="filter_purchase_place"
            value={filterValue.filter_purchase_place}
            values={constants.PurchasePlaces}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, filter_purchase_place: e }))
            }
          />
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          発注者
          <FilterSelect
            id="filter_ship_place"
            value={filterValue.filter_ship_place}
            values={constants.ShipPlaces}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, filter_ship_place: e }))
            }
          />
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          梱包担当
          <Select
            id="filter_employee_name"
            value={filterValue.filter_employee_name}
            onChange={(e) =>
              setFilterValue((prev) => ({ ...prev, filter_employee_name: e }))
            }
          >
            <Select.Option value="">-- なし --</Select.Option>
            {
              employeeList && employeeList.map((item, key) =>
                <Select.Option key={key} value={item.name}>
                  {item.name}
                </Select.Option>)
            }
          </Select>
        </div>

        {Object.prototype.hasOwnProperty.call(filterValue, "sales_count_not0") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.sales_count_not0}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, sales_count_not0: e.target.checked }))
                }
              />{" "}
              Sales not 0日
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "rank_drop_count_not0") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.rank_drop_count_not0}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, rank_drop_count_not0: e.target.checked }))
                }
              />{" "}
              no ランキング降下回数 0日
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "filter_is_own_product") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.filter_is_own_product == '1'}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_is_own_product: e.target.checked ? '1' : '0' }))
                }
              />{" "}
              問屋商品
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "filter_purchase_recommend_product") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.filter_purchase_recommend_product == '1'}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_purchase_recommend_product: e.target.checked ? '1' : '0' }))
                }
              />{" "}
              発注推奨商品
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "filter_fba_real_weight_compare") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.filter_fba_real_weight_compare == '1'}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_fba_real_weight_compare: e.target.checked ? '1' : '0' }))
                }
              />{" "}
              実重量＞容積 商品
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "filter_fba_real_weight_compare_anti") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.filter_fba_real_weight_compare_anti == '1'}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_fba_real_weight_compare_anti: e.target.checked ? '1' : '0' }))
                }
              />{" "}
              容積＞実重量 商品
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "filter_no_has_us_fba_sellers") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.filter_no_has_us_fba_sellers == '1'}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_no_has_us_fba_sellers: e.target.checked ? '1' : '0' }))
                }
              />{" "}
              米国 FBA 出品者の無い商品
            </label>
          </div>
        }
        {Object.prototype.hasOwnProperty.call(filterValue, "filter_has_us_fba_sellers") &&
          <div className='mt-2'>
            <label>
              <Checkbox
                checked={filterValue.filter_has_us_fba_sellers == '1'}
                onChange={(e) =>
                  setFilterValue((prev) => ({ ...prev, filter_has_us_fba_sellers: e.target.checked ? '1' : '0' }))
                }
              />{" "}
              米国 FBA 出品者の商品
            </label>
          </div>
        }

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary me-2"
            style={{ marginBottom: "10px" }}
            onClick={onOk}
          >
            適用
          </button>
        </div>
      </div>
    </Drawer>
  );
}
