---
title: '자료구조 - 복잡도'
subTitle: '알고리듬 성능의 정량화'
date: '2022-11-16'
tags: 'DataStructure, Algorithm'
---

알고리듬 성능을 측정할 수 있을까? 알고리듬 성능은 입력량이 증가함에 따라 증가하는 소비 메모리와 시간을 기준으로 측정한다.

성능이 좋지 않은 알고리듬이라 하더라도 데이터의 양이 적을 경우에는 매우 빠르다고 느낄 수 있기 때문에 알고리듬 간의 성능 비교가 쉽지 않다. 때문에 알고리듬 성능은 주로 무한대에 가까운 입력값을 분석하는 데 필요한 시간과 메모리 양을 측정하며, 이를 `점근적 분석(asymptotic analysis)`이라고 한다. 일반적으로 점근적 성장 속도가 더딜수록 알고리듬의 성능이 좋은 것으로 판단한다.

점근적 분석은 크게 시간과 공간(메모리)을 기준으로 이루어진다.

### 시간 복잡도

`시간 복잡도`란, 입력량이 증가함에 따라 필요한 시간 증가도를 의미하며, 주로 Big O 표기법을 사용하여 나타낸다. 성능이 좋지 않은 알고리듬은 데이터 증가량에 비해 훨씬 긴 실행 시간을 필요로 한다.

### 상수 시간(Constant time)

상수 시간 알고리듬은 입력값의 크기에 상관없이 항상 일정한 실행 시간을 갖는다.

```swift
func getNextCustomer(queue: [String]) {
	if let first = queue.first {
		print("Hello \(first)")
	} else {
		print("no customer")
	}
}
```

인자 `queue` 의 길이가 0이건 100백만이건 `queue`의 첫 번째 요소를 확인하므로, 시간 복잡도는 항상 같은 값 $T(n) = 1$ 을 갖는다. 이를 Big O 표기법으로 나타내면 $O(1)$가 된다.

### 선형 시간(Linear time)

선형 시간 알고리듬은 입력값의 크기에 비례하여 실행 시간이 증가한다.

```swift
func checkAttendance(students: [String]) {
	students.forEach { name in
		print("Hi, \(name)")
	}
}
```

인자 `students`의 길이가 증가할 수록 반복문의 시행 횟수가 증가하므로, 입력값의 크기와 실행 시간은 선형적 관계 $T(n) = n$를 갖는다. 이는 Big O 표기법으로 $O(n)$과 같이 표기한다.

점근적 접근법은 대규모의 데이터를 처리하는데 걸리는 시간을 측정하는 것이기 때문에 보통의 경우 $O(a * n + b)$에서 $a$, $b$와 같은 상수값은 무시한다.

즉 $O(a * n + b)$와 $O(n)$은 같은 것으로 취급한다.

**참고문헌**

[Swift Data Structure and Algorithms](https://www.amazon.com/Swift-Data-Structure-Algorithms-Erik/dp/1785884506)

[Data Structures & Algorithms in Swift](https://www.raywenderlich.com/books/data-structures-algorithms-in-swift/v4.0)

[시간 복잡도 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EC%8B%9C%EA%B0%84_%EB%B3%B5%EC%9E%A1%EB%8F%84#%EC%83%81%EC%88%98_%EC%8B%9C%EA%B0%84_(Constant_time))