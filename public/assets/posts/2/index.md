---
title: '자료구조 - 기본'
subTitle: '자료구조 기본 개념'
date: '2022-11-16'
tags: 'DataStructure, Algorithm'
---

자료구조는 이루고자 하는 목적에 맞추어 데이터를 저장, 검색, 정렬, 유지, 공유하는 방법, 즉 데이터를 효율적으로 체계화하는 방법에 관한 연구이다.

개발자는 `Array`, `Dictionary`, `Set`과 같은 다양한 종류의 데이터 타입을 사용하게 되는데, 이들은 각각 고유의 특성과 성능을 갖고 있다.

예컨대, `Array`와 `Set`을 비교해보면 둘 다 여러 `Element`를 담고 있는 집합형 데이터라는 점은 동일하지만, 특정 `Element`를 검색할 때 `Array`는 `Set`에 비해 오래 걸리며, `Set`은 `Array`처럼 `Element`를 정렬할 수 없다.

사용하는 자료구조에 대한 이해 없이는 사용하는 데이터 타입의 특성과 장단점을 알 수 없고, 어떤 상황에서 어떤 데이터 구조를 사용해야 할지 판단할 수 없다.

반대로 자료구조에 대한 충분한 이해가 있다면 자료구조 자체가 해당 코드의 목적을 이해하기 위한 큰 맥락적 정보가 될 수 있다.

자료구조는 잘 연구된 개념들이며, 이 개념은 개발 언어와 상관없이 적용된다. `C`언어의 자료 구조는 기능적으로나 개념적으로 Swift를 비롯한 다른 언어들의 자료구조와 다르지 않다.

알고리듬은 특정 과제를 수행하기 위한 일련의 동작들을 정의한 것이다. 데이터를 순서에 맞춰 정렬하기 위한 정렬 방법, 8K 해상도의 사진을 원하는 크기로 압축하는 방법 등이 그 예가 될 수 있다.

> "알고리듬을 간단히 설명하자면, 일련의 입력값을 받아서 그에 맞는 일련의 출력값을 내놓기 위해 만들어진, 잘 정의된 컴퓨터 처리 절차라고 할 수 있다. 즉, 알고리듬이란 입력값을 출력값으로 변환하기 위해 만들어진 일련의 컴퓨터 절차이다."

- 토마스 코먼, 찰스 레이서손, 로날드 리베스트, 클리포드 스타인 공저, <알고리즘 개론> (3판, 2009)
> 

## 스위프트 데이터 타입

대부분의 프로그래밍 언어는 기본으로 제공하는 원천(Primitive) 데이터 타입이 있으며, 이는 주로 `Int`, `Float`, `Double`, `Char`, `Bool`과 같은 스칼라 타입(scalar type)을 일컫는다. 하지만 스위프트의 원천 타입은 스클라 타입이 아닌, `Struct`로 구현되어 있다. 이에 대한 배경은 앞으로 정리해 나갈 것이다.

스위프트 데이터는 다양한 타입이 있으며 크게 아래와 같은 방식으로 분류 가능하다.

- 값 타입과 참조 타입
- 기명 타입과 복합 타입

### 값 타입과 참조 타입

값(Value) 타입의 객체는 다른 변수, 상수에 할당되거나, 혹은 함수에 전달되었을 때, 객체의 현재 값을 복사하여 객체와 동일한 값을 할당 또는 전달한다.

```swift
var originalValue = "HAPPY"
var anotherValue = originalValue // - 1
anotherValue = "HAPPIER"

print(originalValue) // "HAPPY" - 2
print(anotherValue) // "HAPPIER" - 2
```

1. 변수 `originalValue`의 현재 값을 복사하여 변수 `anotherValue`에 할당.

2. 변수 `anotherValue`에 다른 값이 할당되었기 때문에 `originalValue`와 다른 값을 출력함.

참조(Reference) 타입은 다른 변수, 상수에 할당, 또는 함수에 전달할 때 객체의 현재 값이 아니라 참조값(메모리 주소)을 할당 또는 전달한다. 때문에 여러 변수, 또는 객체에서 참조라는 방식으로 동일한 객체를 공유할 수 있다.

```swift
class ReferenceType {
	var someValue = "HAPPY"
}

var originalValue = ReferenceType()
var anotherValue = originalValue // - 1
anotherValue.someValue = "HAPPIER"

print(originalValue.someValue) // "HAPPIER" - 2
print(anotherValue.someValue) // "HAPPER" - 2
```

1. 변수 `originalValue`에 할당되어 있는 객체의 참조값을 `anotherValue`에 할당. `originalValue`와 `anotherValue`는 같은 객체가 할당되어 있음

2. 두 변수에 같은 객체가 할당되었기 때문에 두 변수 모드 같은 값을 출력함

### 기명 타입과 복합 타입

기명 타입(Named type)은 사용자가 직접 이름을 부여하여 정의한 타입이다. 기명 타입은 아래와 같은 종류가 있다.

- `Class`
- `Struct`
- `Enum`
- `Protocol`

또한 `Array`, `Dictionary`, `Set`, `Optional`과 같은 스위프트 라이브러리에서 제공하는 기명 타입도 있다. 기명 타입은 `extension`을 통해 기능을 확장할 수 있다.

복합 타입(Composed type)은 별도의 이름이 정해지지 않은 타입이며, 여러 기명 타입과 복합 타입을 조합할 수 있다. 복합 타입에는 `Function`과 `Tuple`이 있다.

**참고**

[Swift Data Structure and Algorithms](https://www.amazon.com/Swift-Data-Structure-Algorithms-Erik/dp/1785884506)

[Data Structures & Algorithms in Swift](https://www.raywenderlich.com/books/data-structures-algorithms-in-swift/v4.0)