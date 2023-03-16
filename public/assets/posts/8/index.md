---
title: 'JavaScript의 불변성'
subTitle: 'JavaScript의 모든 데이터는 참조값 입니다.'
date: '2022-12-01'
tags: 'JavaScript'
---

## 들어가며

JavaScript에서 `immutability`는 관련하여 여러 라이브러리가 존재할 만큼 중요한 개념 중 하나입니다. 대표적인 라이브러리로는 [immutable.js](https://immutable-js.com/), [immer](https://immerjs.github.io/immer/) 등이 있으며 [React](https://reactjs.org/)의 상태 비교 방식에서도 해당 개념이 등장합니다. ‘불변성’이라고 번역하고 ‘데이터가 변하지 않음’을 뜻하는 이 개념을 알아보기 위해서는 우선 JavaScript 데이터가 메모리에 어떻게 저장되는지에 대한 이해가 필요합니다.

## 모든 데이터는 참조값

변수를 선언하고 값을 할당하면 아래와 같은 절차를 통하게 됩니다.

- 변수를 위한 메모리의 빈 영역을 확보하고, 해당 영역에 대한 식별자로서 변수 이름을 할당합니다.
- 값을 위한 또 다른 메모리의 빈 영역을 확보하고, 해당 영역에 할당할 값을 저장합니다.
- 변수 이름을 저장한 영역에 값을 저장한 메모리 영역의 주소를 저장합니다.

여기서 주목할 점은 변수 이름과 값을 함께 저장하는 것이 아니라, 값은 다른 영역에 따로 저장한 뒤 해당 영역의 메모리 주소를 저장한다는 것입니다. 즉 변수에는 할당하고자 하는 값이 아닌, 참조해야 할 메모리의 주솟값이 저장됩니다.

이후 해당 변수의 값을 읽기 위해 변수에 접근하면 아래와 같은 절차를 통하게 됩니다.

- 식별자인 변수 이름을 통해 변수의 메모리 영역을 찾고, 저장된 ‘값 메모리 주소’를 읽습니다.
- ‘값 메모리 주소’를 이용하여 해당 메모리 영역에 저장된 ‘값’을 읽습니다.

즉 JavaScript의 변수는 값 자체를 저장하고 있는 것이 아니라, 값이 저장된 다른 영역의 주솟값을 저장하고 있고, 이를 이용하여 해당 값을 참조하는 것입니다. 이는 `Primitive type`, `Object type` 모두 동일하게 적용됩니다.

## 참조값의 특징

만약 아래와 같이 동일한 값을 가지고 있는 두 변수가 있다고 가정을 한다면, 두 변수에는 어떤 주솟값이 저장될까요?

```jsx
const a = 1;
const b = 1;
console.log(a === b); // true
```

값인 `1`을 개별적으로 저장하고 서로 다른 주솟값을 저장할까요? 아니면 값은 한 번만 저장하고 동일한 주솟값을 공유할까요? JavaScript는 동일한 값일 경우에는 그 값을 중복해서 저장하지 않고 기존값을 공유합니다. 따라서 변수 `a`와 `b`는 동일한 주솟값을 가지고 있고 `===` 비교 연산을 할 때 두 변수의 주솟값이 같은지를 확인합니다.

그리고 중복되지 않은 값을 할당할 경우 기존 값을 변경하는 것이 아니라 새로운 값을 생성하고 해당 주솟값을 변수에 저장합니다.

```jsx
let a = 1; // 1
a = 2; // 2
a += 1; // 3
```

위 예시 코드에서는 변수 `a`의 값이 `1 → 2 → 3`과 같이 변경되었습니다. 이때 새로운 값인 `2`, `3`은 새 메모리 영역에 값을 저장하고 해당 주솟값을 변수에 저장합니다. 이때 기존 데이터인 `1`이 새로운 값인 `2`, `3`으로 변경되지 않고 새로운 값이 생성되었기에 이를 ‘변하지 않았다’는 뜻에서 **불변**하다고 표현합니다.

값의 참조는 몇 가지 특징이 있습니다.

- 값 저장 시 동일한 값이 존재하는지 확인하는 추가 단계가 필요하다.
- 하지만 중복된 값을 반복적으로 생성하지 않으므로 메모리 효율을 높일 수 있다.
- 값 비교 시 값의 크기, 종류와 상관없이 주솟값만을 비교하면 되므로 간단하다.
- 같은 참조 값을 갖는 변수는 공통된 값을 가리키게 된다. 이에 따라 같은 참조 값을 갖는 모든 변수의 값을 동시에 변경할 수 있다.
- 하지만 동시에 의도하지 않는 값의 변경이 발생할 수 있다.

## Object의 불변성

`Primitive type`의 데이터는 단일 값인 것에 반해, `Object type` 데이터는 여러 값의 모음이라고 할 수 있습니다. 값의 모음을 나타내기 위해서는 어떤 주솟값들로 구성되었는지에 관한 정보가 필요하고, `Object type`의 데이터에는 바로 이 주솟값 목록이 저장된 주솟값이 저장됩니다.

```jsx
const obj = {
	a: 1,
	b: 1
}
```

위 예시 코드를 실행할 경우 아래와 같은 절차가 진행됩니다.

- 변수를 위한 메모리의 빈 영역을 확보하고, 해당 영역에 대한 식별자로서 변수 이름 `obj`를 할당합니다.
- 값을 위한 또 다른 메모리의 빈 영역을 확보합니다.
- 데이터 타입이 여러 프로퍼티로 이루어진 데이터 모음이므로, 프로퍼티 모음 정보를 저장할 별도의 메모리 영역과 각 프로퍼티를 위한 메모리 영역을 확보합니다.
- 프로퍼티 `a`, `b`를 앞서 기술한 변수 저장 절차에 따라 저장합니다.
- 프로퍼티 모음 정보를 위한 메모리 영역에 프로퍼티 `a`, `b`의 주솟값 범위를 값으로 저장합니다.
- 변수 `obj`에 프로퍼티 모음 정보의 주솟값을 저장합니다.

즉 `Object type` 데이터는 `변수 > 프로퍼티 모음 정보 > 프로퍼티`와 같은 참조 단계를 갖게 됩니다. 그런데 만약 `obj.a = 2`와 같이 프로퍼티의 값을 변경하게 되면 어떻게 될까요? `2`라는 값을 새 메모리 영역에 저장하고 해당 주솟값을 `a`의 값으로 변경하게 됩니다. 앞서 설명한 것과 같이 프로퍼티의 값은 새롭게 생성되었으므로 불변성을 가집니다. 하지만 `Object type` 데이터인 변수 `obj`를 기준에서는 여전히 동일한 주솟값 정보(프로퍼티 모음 정보)를 가지고 있지만 내부 값인 프로퍼티의 값이 변경된 것으로 볼 수 있습니다. 즉 값이 변경된 것입니다. 이때 `Object type` 데이터는 ‘불변하지 않다’고 표현합니다. 그리고 이러한 특성으로 인해 아래와 같은 현상이 발생합니다.

```jsx
const a = 1;
let b = a;
b = 2;
console.log(b); // 2
console.log(a); // 1

const obj1 = {
	a: 1
}
const obj2 = obj1;
obj2.a = 2;
console.log(obj2.a); // 2
console.log(obj1.a); // 2
```

변수 `b`는 초깃값으로 `a`의 주솟값을 할당하여 동일한 값을 참조하고 있었지만, 새로운 값 `2`를 할당하여 새로운 주소를 참조하게 되었습니다. 이에 따라 변수 `a`와 `b`는 서로 다른 값을 참조합니다.

변수 `obj2`는 초깃값으로 `obj1`의 주솟값을 할당하여 동일한 값을 참조하고 있습니다. 그리고 프로퍼티인 `obj2.a`에 새로운 값 `2`를 할당하여 프로퍼티 `a`에는 새로운 주솟값이 저장되었지만, `obj1`과 `obj2`가 참조하고 있는 주솟값이 변경되지는 않았습니다. 즉 `obj1`과 `obj2`는 여전히 같은 주솟값을 참조하고 있으며, `obj1.a` 와 `obj2.a`는 같은 메모리 영역을 참조하고 있으므로 두 값은 동일한 값을 출력합니다.

이와 같은 특성은 때에 따라서는 효율적일 수 있지만, 유사한 코드가 다르게 동작하기 때문에 개발자의 실수를 유발할 수 있습니다. 이를 방지하고자 `Object type` 데이터의 프로퍼티 값을 변경할 수 없도록 제한하거나, `Object type` 데이터를 변경할 때는 새로운 데이터로 복사하여 변경하는 등의 방법들이 고안되었습니다.

## Object 불변성 유지 방법 - 프로퍼티 변경 제한

`Object.freeze()` 메소드를 이용하면 프로퍼티의 변경을 막을 수 있습니다. 단 중첩하여 존재하는 하위 객체의 프로퍼티 변경은 제한하지 않습니다. 이때 하위 객체의 프로퍼티 변경을 막기 위해서는 하위 객체에도 마찬가지로 `Object.freeze()` 메소드를 적용해 주어야 합니다.

```jsx
const obj = {
	a: 1,
	b: {
		B: 1
	}
}
obj.a = 2;
console.log(obj.a); // 2

Object.freeze(obj);
obj.a = 3;
console.log(obj.a); // 2
obj.b.B = 3;
console.log(obj.b.B); // 3

Object.freeze(obj.b);
obj.b.B = 4;
console.log(obj.b.B); // 3
```

## Object 불변성 유지 방법 - 데이터 복사

`Object`를 복사하는 방법에는 ‘얕은 복사’와 ‘깊은 복사’가 있습니다. 이 둘은 중첩된 `Object` 데이터를 떠올리며 이해하면 도움이 될 수 있습니다. ‘얕은 복사’는 단순히 해당 `Object`의 프로퍼티 모음 정보를 복사하는 것이며, ‘깊은 복사’는 중첩된 객체를 포함한 모든 데이터를 복사하여 새로운 메모리 영역에 저장하는 것입니다.

```jsx
const obj = {
	a: 1,
	b: {
		B: 1
	}
};

// 얕은 복사
const shallowCopied_1 = Object.assign({}, obj);
const shallowCopied_2 = { ...obj };

// 깊은 복사
function copyObjectDeeply_1(target) {
	const result = {};
	if (typeof target !== 'object' || target === null) {
		result = target;
	}
	for (property in obj) {			
		result[property] = copyObjectDeeply_1(target[property]);
	}
	return result;
}

function copyObjectDeeply_2(target) {
	return JSON.parse(JSON.stringify(target));
}
```

## Object 불변성 유지 방법 - 불변 메소드

`Object`의 내장 메소드에는 원본 데이터를 유지한 채로 복사한 새 데이터를 반환하는 메소드들이 있습니다. 아래와 같은 메소드를 활용하면 원본 데이터의 불변성을 유지한 채로 변경된 데이터를 얻을 수 있습니다.

- [Array.prototype.concat()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [Array.prototype.filter()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.slice()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [Array.prototype.flat()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
- [Array.prototype.reduce()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

## 참고

- [코어 자바스크립트 - 위키북스](https://wikibook.co.kr/corejs/)
- [JavaScript Immutability - 생활코딩](https://www.youtube.com/playlist?list=PLuHgQVnccGMBxNK38TqfBWk-QpEI7UkY8)
- [Is number in JavaScript immutable? - stackoverflow.com](https://stackoverflow.com/questions/10648367/is-number-in-javascript-immutable)