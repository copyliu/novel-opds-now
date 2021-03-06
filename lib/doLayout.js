"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const layout_1 = __importDefault(require("@node-novel/layout"));
const rules_1 = __importDefault(require("@node-novel/layout-pattern/lib/rules"));
let ruleData;
function initRuleData() {
    if (ruleData == null) {
        ruleData = {
            rule_tpl: getRule('demo.lf2.cht'),
            rule_base: getRule('base-v2'),
        };
    }
    return ruleData;
}
function _my_words(ruleData) {
    let words = [];
    let arr = [];
    words = words.concat(ruleData.rule_tpl.words || []);
    arr = arr.concat(ruleData.rule_tpl.words_arr || []);
    words = words.concat(ruleData.rule_base.words || []);
    arr = arr.concat(ruleData.rule_base.words_arr || []);
    words = words.concat(ruleData.rule_tpl.words || []);
    arr = arr.concat(ruleData.rule_tpl.words_arr || []);
    words = layout_1.default._words1(arr, words);
    return layout_1.default._words2(words);
}
function getRule(id) {
    let rule = rules_1.default(id);
    return {
        ...rule,
        words_arr: [],
    };
}
function my_words(html, ruleData) {
    html = html.toString();
    let words = _my_words(ruleData);
    let ret = layout_1.default.replace_words(html, words);
    html = ret.value;
    return html;
}
function handleContext(_t_old, meta) {
    let _t = layout_1.default.toStr(_t_old);
    if (meta && meta.options && meta.options.textlayout && !meta.options.textlayout.allow_lf2) {
        _t = layout_1.default.reduceLine(_t, meta.options.textlayout || {});
    }
    _t = my_words(_t, initRuleData());
    _t = layout_1.default.textlayout(_t, {});
    _t = my_words(_t, ruleData);
    _t = layout_1.default.replace(_t, {
        words: true,
    });
    _t = layout_1.default.trim(_t);
    return _t;
}
exports.handleContext = handleContext;
exports.default = handleContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9MYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb0xheW91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLGdFQUEyQztBQUMzQyxpRkFBMEY7QUFJMUYsSUFBSSxRQUdILENBQUM7QUFFRixTQUFTLFlBQVk7SUFFcEIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUNwQjtRQUNDLFFBQVEsR0FBRztZQUNWLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ2pDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzdCLENBQUE7S0FDRDtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxRQUdsQjtJQUVBLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUViLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXBELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXJELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRXBELEtBQUssR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEMsT0FBTyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQXlCLEVBQUs7SUFFN0MsSUFBSSxJQUFJLEdBQUcsZUFBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTlCLE9BQU87UUFDTixHQUFHLElBQUk7UUFDUCxTQUFTLEVBQUUsRUFBYztLQUN6QixDQUFBO0FBQ0YsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLElBQXFCLEVBQUUsUUFHeEM7SUFFQSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXZCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVoQyxJQUFJLEdBQUcsR0FBRyxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFL0MsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFFakIsT0FBTyxJQUFJLENBQUE7QUFDWixDQUFDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLE1BQXVCLEVBQUUsSUFNdEQ7SUFFQSxJQUFJLEVBQUUsR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUN6RjtRQUNDLEVBQUUsR0FBRyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUM7S0FDN0Q7SUFFRCxFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLEVBQUUsR0FBRyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFNUIsRUFBRSxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtRQUMxQixLQUFLLEVBQUUsSUFBSTtLQUNYLENBQUMsQ0FBQztJQUVILEVBQUUsR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV4QixPQUFPLEVBQUUsQ0FBQztBQUNYLENBQUM7QUExQkQsc0NBMEJDO0FBRUQsa0JBQWUsYUFBYSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAyMC8xLzMwLlxuICovXG5cbmltcG9ydCBub3ZlbFRleHQgZnJvbSAnQG5vZGUtbm92ZWwvbGF5b3V0JztcbmltcG9ydCBnZXRCdWlsZEluUnVsZSwgeyBnZXRCdWlsZEluUnVsZVBhdGggfSBmcm9tICdAbm9kZS1ub3ZlbC9sYXlvdXQtcGF0dGVybi9saWIvcnVsZXMnO1xuaW1wb3J0IHsgSVBhdHRlcm5SdWxlIH0gZnJvbSAnQG5vZGUtbm92ZWwvbGF5b3V0LXBhdHRlcm4vbGliL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSVJ1bGVMaXN0S2V5IH0gZnJvbSAnQG5vZGUtbm92ZWwvbGF5b3V0LXBhdHRlcm4vbGliL3J1bGVzLWtleXMnO1xuXG5sZXQgcnVsZURhdGE6IHtcblx0cnVsZV90cGw6IFJldHVyblR5cGU8dHlwZW9mIGdldFJ1bGU+LFxuXHRydWxlX2Jhc2U6IFJldHVyblR5cGU8dHlwZW9mIGdldFJ1bGU+LFxufTtcblxuZnVuY3Rpb24gaW5pdFJ1bGVEYXRhKClcbntcblx0aWYgKHJ1bGVEYXRhID09IG51bGwpXG5cdHtcblx0XHRydWxlRGF0YSA9IHtcblx0XHRcdHJ1bGVfdHBsOiBnZXRSdWxlKCdkZW1vLmxmMi5jaHQnKSxcblx0XHRcdHJ1bGVfYmFzZTogZ2V0UnVsZSgnYmFzZS12MicpLFxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBydWxlRGF0YTtcbn1cblxuZnVuY3Rpb24gX215X3dvcmRzKHJ1bGVEYXRhOiB7XG5cdHJ1bGVfdHBsOiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRSdWxlPixcblx0cnVsZV9iYXNlOiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRSdWxlPixcbn0pXG57XG5cdGxldCB3b3JkcyA9IFtdO1xuXHRsZXQgYXJyID0gW107XG5cblx0d29yZHMgPSB3b3Jkcy5jb25jYXQocnVsZURhdGEucnVsZV90cGwud29yZHMgfHwgW10pO1xuXHRhcnIgPSBhcnIuY29uY2F0KHJ1bGVEYXRhLnJ1bGVfdHBsLndvcmRzX2FyciB8fCBbXSk7XG5cblx0d29yZHMgPSB3b3Jkcy5jb25jYXQocnVsZURhdGEucnVsZV9iYXNlLndvcmRzIHx8IFtdKTtcblx0YXJyID0gYXJyLmNvbmNhdChydWxlRGF0YS5ydWxlX2Jhc2Uud29yZHNfYXJyIHx8IFtdKTtcblxuXHR3b3JkcyA9IHdvcmRzLmNvbmNhdChydWxlRGF0YS5ydWxlX3RwbC53b3JkcyB8fCBbXSk7XG5cdGFyciA9IGFyci5jb25jYXQocnVsZURhdGEucnVsZV90cGwud29yZHNfYXJyIHx8IFtdKTtcblxuXHR3b3JkcyA9IG5vdmVsVGV4dC5fd29yZHMxKGFyciwgd29yZHMpO1xuXG5cdHJldHVybiBub3ZlbFRleHQuX3dvcmRzMih3b3Jkcyk7XG59XG5cbmZ1bmN0aW9uIGdldFJ1bGU8VCBleHRlbmRzIElSdWxlTGlzdEtleT4oaWQ6IFQpXG57XG5cdGxldCBydWxlID0gZ2V0QnVpbGRJblJ1bGUoaWQpO1xuXG5cdHJldHVybiB7XG5cdFx0Li4ucnVsZSxcblx0XHR3b3Jkc19hcnI6IFtdIGFzIHN0cmluZ1tdLFxuXHR9XG59XG5cbmZ1bmN0aW9uIG15X3dvcmRzKGh0bWw6IEJ1ZmZlciB8IHN0cmluZywgcnVsZURhdGE6IHtcblx0cnVsZV90cGw6IFJldHVyblR5cGU8dHlwZW9mIGdldFJ1bGU+LFxuXHRydWxlX2Jhc2U6IFJldHVyblR5cGU8dHlwZW9mIGdldFJ1bGU+LFxufSlcbntcblx0aHRtbCA9IGh0bWwudG9TdHJpbmcoKTtcblxuXHRsZXQgd29yZHMgPSBfbXlfd29yZHMocnVsZURhdGEpO1xuXG5cdGxldCByZXQgPSBub3ZlbFRleHQucmVwbGFjZV93b3JkcyhodG1sLCB3b3Jkcyk7XG5cblx0aHRtbCA9IHJldC52YWx1ZTtcblxuXHRyZXR1cm4gaHRtbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlQ29udGV4dChfdF9vbGQ6IEJ1ZmZlciB8IHN0cmluZywgbWV0YT86IHtcblx0b3B0aW9ucz86IHtcblx0XHR0ZXh0bGF5b3V0Pzoge1xuXHRcdFx0YWxsb3dfbGYyPzogYm9vbGVhbixcblx0XHR9XG5cdH1cbn0pXG57XG5cdGxldCBfdCA9IG5vdmVsVGV4dC50b1N0cihfdF9vbGQpO1xuXG5cdGlmIChtZXRhICYmIG1ldGEub3B0aW9ucyAmJiBtZXRhLm9wdGlvbnMudGV4dGxheW91dCAmJiAhbWV0YS5vcHRpb25zLnRleHRsYXlvdXQuYWxsb3dfbGYyKVxuXHR7XG5cdFx0X3QgPSBub3ZlbFRleHQucmVkdWNlTGluZShfdCwgbWV0YS5vcHRpb25zLnRleHRsYXlvdXQgfHwge30pO1xuXHR9XG5cblx0X3QgPSBteV93b3JkcyhfdCwgaW5pdFJ1bGVEYXRhKCkpO1xuXHRfdCA9IG5vdmVsVGV4dC50ZXh0bGF5b3V0KF90LCB7fSk7XG5cdF90ID0gbXlfd29yZHMoX3QsIHJ1bGVEYXRhKTtcblxuXHRfdCA9IG5vdmVsVGV4dC5yZXBsYWNlKF90LCB7XG5cdFx0d29yZHM6IHRydWUsXG5cdH0pO1xuXG5cdF90ID0gbm92ZWxUZXh0LnRyaW0oX3QpO1xuXG5cdHJldHVybiBfdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQ29udGV4dFxuIl19