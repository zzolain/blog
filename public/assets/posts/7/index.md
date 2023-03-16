---
title: 'JavaScript의 객체'
subTitle: 'Object는 key-value 데이터인 줄로만 알았습니다.'
date: '2022-11-23'
tags: 'JavaScript'
---

세상에는 많은 프로그래밍 언어가 있습니다. 지금까지 `C`, `Java`, `Kotlin`, `Swift`, `JavaScript` 등 셀 수 없이 많은 언어가 프로그래밍을 위해 개발되었고, 또 하루가 다르게 새로운 언어가 생겨나고 있습니다. 이들은 각자 고유한 특성을 가지고 우수성을 뽐내기도 하고, 서로의 장점을 결합하여 공통적인 특성을 가지기도 합니다.

대부분의 프로그래밍 언어가 갖는 공통적인 특성 중에는 데이터 타입이 있습니다. 비록 언어마다 이름은 다르지만, 문자, 정수, 실수, 참/거짓, 날짜, 목록 등을 표현하기 위한 데이터 타입이 존재합니다.

`JavaScript`(이하 자바스크립트) 또한 이들을 표현하기 위한 데이터 타입이 있습니다. 문자 표현을 위한 데이터 타입은 `String`, 숫자(정수, 실수를 모두 포함) 표현을 위한 데이터 타입은 `Number`가 있으며, `key-value` 쌍으로 된 `Map` 자료구조를 표현하기 위한 데이터 타입은 `Object`, 한글로는 ‘객체’라고 부릅니다(`ECMAScript 6`에서는 이를 위한 `Map`이 새롭게 추가되었습니다). 저는 지금까지 자바스크립트의 객체를 그저 다른 언어의 `Map` 구현체들과 이름이 다른 타입 정도로 여기고 사용해 왔습니다. 왜 하필 이름이 ‘객체’이었는지에 대한 의문도 없이 말이죠.

## JavaScript의 객체

자바스크립트의 객체는 다른 언어들의 `Map`과는 차이점이 있습니다. value의 타입을 특정한 타입 하나로 지정하는 것이 아니라 `String`, `Number`, 심지어 함수까지 개발자가 원하는 여러 타입을 하나의 객체 안에 섞어서 저장할 수 있습니다. 예컨대 아래와 같은 형태가 가능합니다.

```jsx
const javascript = {
	name: "JavaScript", // -> string type
	birth: 1995, // -> number type
	say: function() { console.log("Hello World") } // -> function type
}
```

자바스크립트는 느슨한 타입(loose typing)의 언어기 때문에 당연하다고 대수롭지 않게 넘어갈 수 있지만(제가 그랬습니다…), 자세히 살펴보면 흥미로운 점을 찾을 수 있습니다. 위 예시는 자바스크립트와 관련된 데이터와 함수를 하나의 변수에 묶어서 정리한 것입니다. 만약 데이터를 ‘상태’라고 칭하고 함수를 ‘행동’이라고 칭한다면 이들의 모음을 객체지향언어에서 말하는 객체로 볼 수 있지 않을까요? 실제로 이 데이터 타입의 이름은 `Object` 즉, ‘객체’입니다.

자바스크립트의 객체는 단순히 `key-value` 쌍의 데이터를 저장하기 위한 것이 아니라 객체지향언어의 객체를 표현하기 위한 데이터 타입입니다. 객체라면 상태와 행동을 정의하고 이를 바탕으로 하는 인스턴스를 반복적으로 생성할 수 있을 것입니다. 객체를 정의하고 또 반복적으로 생성하려면 어떻게 해야 할까요?

## 객체 생성

객체를 생성하는 가장 간단한 방법은 리터럴 표기법을 사용하는 것입니다. `{}` 안에 원하는 내용을 정의하면 됩니다. 

```jsx
const user = {
	id: 1,
	name: 'jinsol',
	say: function() { console.log('Hello world') }
}
```

어려운 문법 없이 손쉽게 작성할 수 있습니다. 하지만 만약 동일한 내용의 객체를 수없이 많이 생성해야 한다고 하면 어떨까요?

```jsx
const user1 = {
	id: 1,
	name: 'jinsol',
	say: function() { console.log('Hello world') }
}

const user2 = {
	id: 2,
	name: 'son',
	say: function() { console.log('Hello world') }
}

// ...
const user9999999 = {
	id: 9999999,
	name: 'kane',
	say: function() { console.log('Hello world') }
}
```

몇 가지 문제가 있을 것입니다.

- 일정량의 동일한 코드를 반복해서 작성했습니다.
- 각 객체 간의 연관성을 표현하지 못했습니다.
(동일한 `key`들을 갖고 있다는 점을 제외하면 각 객체는 아무런 연관이 없는 것처럼 보입니다. 다시 말해 `user1` 객체와 `user2` 객체가 모두 동일하게 `user`라는 대상을 표현한다는 것을 알 수 없습니다)
- 똑같은 내용의 함수를 매번 새로 생성했습니다.

### 객체 생성 함수

하나씩 살펴보겠습니다. 우선 코드의 반복은 함수를 사용하면 어떨까요? 반복되지 않는 정보는 인자로 전달 받아 객체를 동적으로 생성하는 함수를 만드는 것입니다.

```jsx
function UserFactory(id, name) {
	return ({
		id: id,
		name: name,
		say: function() { console.log('Hello world') }
	});
}

const user1 = UserFactory(1, 'jinsol');
const user2 = UserFactory(2, 'son');
```

객체를 함수의 반환 값으로 만듦으로써, 반복되었던 객체 생성에 관한 코드는 함수 내부에 한 번만 작성하면 됩니다. 수정할 때도 함수 내부만 변경하면 모든 객체의 내용을 수정할 수 있습니다. 하지만 이들은 함수에서 반환한 하나의 `Object`일 뿐 여전히 서로 상관없는 독립적인 데이터입니다.

### new 키워드

다른 객체 지향 언어에서 객체를 생성할 때 사용하는 `new`라는 키워드가 있습니다. 자바스크립트에도 동일한 키워드가 있으며, 아마도 가장 대표적으로 이 키워드를 사용한 경험은 `Date` 타입 데이터 생성을 위해 사용한 `new Date()`일 것입니다. 대부분의 객체 지향 언어에서는 `class` 또는 `struct` 등을 `new` 키워드와 함께 사용하여 해당 인스턴스를 생성하지만, 자바스크립트는 `function`이 객체 생성자 역할을 합니다. 물론 앞서 언급한 `new Date()`의 `Date` 또한 다름 아닌 함수입니다. 객체 생성자를 이용하는 방법은 아래와 같이 `function` 앞에 `new`를 붙여 객체를 생성합니다.

```jsx
function User(id, name) {
	this.id = id;
	this.name = name;
	this.say = function() { console.log('Hello world') }
}

const user1 = new User(1, 'jinsol');
console.log(user1.id); // 1
console.log(user1.name); // 'jinsol'
console.log(user1.say()); // 'Hello world'

const user2 = new User(2, 'son');
console.log(user2.id); // 2
console.log(user2.name); // 'son'
console.log(user2.say()); // 'Hello world'

console.log(user1.constructor);
/** ƒ User(id, name) {
	this.id = id;
	this.name = name;
	this.say = function() { console.log('Hello world') }
}
**/
console.log(user1.constructor === user2.constructor); // true

```

생성자를 이용하여 객체를 생성하면 `인스턴스.constructor`라는 예약된 프로퍼티(자동으로 생성됨)에서 해당 생성자를 확인할 수 있습니다. 위 예시에서 `user1.constructor`에 접근하면 생성자 함수 `User`를 확인할 수 있습니다. `user2.constructor`도 마찬가지로 `User` 를 가리키고 있으며, `user1.constructor`와 `user2.constructor`는 동일한 참조 값을 갖고 있으므로 두 객체 모두 `User` 생성자에 의해 생성된 객체라는 정보를 얻을 수 있습니다. 즉 `user1`, `user2`의 연결고리가 생긴 것입니다.

### 객체 Prototype

마지막으로 `User` 객체 생성 시 동일한 함수가 반복적으로 생성되는 문제를 다뤄보겠습니다. 생성자에 정의하였기 때문에 코드 유지보수 상의 문제는 없지만 객체 생성 시 동일한 함수를 위한 메모리가 소모됩니다. 만약 모든 객체가 하나의 함수를 공유한다면 메모리 효율을 높일 수 있을 것입니다. 이를 위한 자바스크립트 기능으로 `Prototype`(이하 프로토타입)이 있습니다. 프로토타입이란 모든 객체 인스턴스에 공유할 속성과 메소드를 담은 객체라고 할 수 있습니다. 프로토타입에 정의된 속성과 메소드는 마치 인스턴스의 속성과 메소드에 접근하는 것과 동일한 문법 `인스턴스.프로토타입속성`으로 접근할 수 있습니다.

```jsx
function User(id, name) {
	this.id = id;
	this.name = name;
}

const user1 = new User(1, 'jinsol');
console.log(user1.say) // undefined

User.prototype.say = function() { console.log('Hello world') }

user1.say(); // 'Hello world'

const user2 = new User(2, 'son');
user2.say(); // 'Hello world'
```

위의 예시에서 `User` 생성자에는 `say()`를 정의하지 않았습니다. 그 때문에 `console.log(user1.say)` 결괏값이 `undefined`로 출력되었습니다. 하지만 `User.prototype.say` 속성에 함수를 할당하면 `user1.say`로 접근할 수 있고, 또 다른 인스턴스인 `user2`도 `user2.say`로 접근할 수 있습니다. 한 번 생성한 함수를 모든 인스턴스가 공유할 수 있게 된 것입니다.

자바스크립트에서는 객체 간의 상속을 구현하기 위해 프로토타입을 이용합니다. 이것이 자바스크립트가 프로토타입 기반 언어라고 불리는 이유일 것입니다. 언어의 정체성을 담고 있는 개념인 만큼, 자바스크립트를 이해하는 데 가장 중요한 내용 중 하나일 것입니다. 자바스크립트의 `class`도 이를 바탕으로 만들어진 문법이라고 하니 `class`의 동작원리를 이해하는데도 큰 도움이 될 것 같습니다.

자바스크립트의 `Object`는 정말 ‘객체’, 그 자체를 의미하는 것이었습니다.

## 참고

- [JavaScript의 타입과 자료구조 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures#%EA%B0%9D%EC%B2%B4)
- [JavaScript Obejct Oriented Programming - 생활코딩](https://www.youtube.com/playlist?list=PLuHgQVnccGMAMctarDlPyv6upFUUnpSO3)