/**
 * 构造树型结构数据
 *
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(
	data,
	id = "id",
	parentId = "parentId",
	children = "children",
	rootId = 0
) {
	// 对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data));
	// 循环所有项
	const treeData = cloneData.filter((father) => {
		let branchArr = cloneData.filter((child) => {
			//返回每一项的子级数组
			return father[id] === child[parentId];
		});
		branchArr.length > 0 ? (father.children = branchArr) : "";
		//返回第一层
			return father[parentId] === rootId;
		});
	return treeData !== "" ? treeData : data;
}

export const calculateDiscountRate = (marketPrice, salePrice) => {
	if (marketPrice <= 0) return 0; // 시장가가 0 이하일 경우 0% 반환
	const discountRate = ((marketPrice - salePrice) / marketPrice) * 100;
	return discountRate.toFixed(0); // 소수점 두 자리까지 반환
};

/**
 * 숫자를 천 단위로 표시하는 함수
 * @param {number} value 숫자
 * @returns {string} 천 단위로 표시된 문자열
 */
export const formatNumber = (value) => {
	return value.toLocaleString();
}

/**
 * 숫자를 소수점 두 자리로 표시하는 함수
 * @param {number} value 숫자
 * @returns {string} 소수점 두 자리로 표시된 문자열
 */
export const formatDecimal = (value) => {
	return value.toFixed(2);
}

/**
 * 숫자를 소수점 두 자리로 표시하는 함수
 * @param {number} value 숫자
 * @returns {string} 소수점 두 자리로 표시된 문자열
 */
export const formatPrice = (value) => {
	return (value / 100).toFixed(2);
}

/**
 * 공백, null, "", undefined 체크 함수	
 * @param {any} value 값
 * @returns {boolean} 공백, null, "", undefined 여부
 */
export const isEmpty = (value) => {
	return value === null || value === undefined || value === '' || value === 'null' || value === 'undefined';
}