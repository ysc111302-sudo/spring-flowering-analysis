# 봄의 순서는 지금도 같을까?

대구2001–2025년 개나리·진달래·벚나무 실제 관측 개화일75건으로 읽는 한국어12장 발표자료입니다. 최종 디자인과 분석을 유지한 공개 배포 전용 저장소입니다.

방향키 또는 화면 버튼으로 이동합니다. Space/PageUp·PageDown/Home·End,F/전체화면,모션 켜기/끄기를 지원합니다. 출처와 계산 방법은 발표 마지막 장의 링크 및 site/sources.html에서 확인할 수 있습니다.

## 공개 파일

site/에는 최종HTML·CSS·JavaScript,최적화 이미지3개,로컬 글꼴과OFL,anime.js와MIT라이선스,출처 문서와SHA-256 배포목록만 포함합니다. 분석값은 편집 가능한SVG/HTML에 포함되어 외부 데이터 파일 다운로드가 필요하지 않습니다.

원본 inbox·디자인 레퍼런스PDF·개인 자료·인증정보·.env·임시파일·다른 프로젝트의Git이력은 포함하지 않습니다. 사용자 제공 Gemini 이미지는 이번 공개 배포 승인을 받아 사용하며 실제 관측 장소·동시 개화의 증거가 아닌AI 생성 개념 이미지로 표시합니다. 글꼴은SIL OFL1.1,anime.js는MIT에 따라 라이선스를 동봉합니다. 저장소 전체에 제3자 자산을 포괄하는 별도 오픈소스 라이선스를 부여하지 않습니다.

## 배포 방식

main의site/ 또는Pages workflow를 수정해일반push하면GitHub Actions가 허용목록·해시를 검사하고site/만GitHub Pages에 배포합니다. 수동으로Actions의Deploy spring flowering presentation을 실행할 수도 있습니다. 공개 주소와 검증 결과는 아래 및 docs/STATUS.md에 기록합니다.


## 공개 주소 및 검증

발표: https://ysc111302-sudo.github.io/spring-flowering-analysis/

저장소: https://github.com/ysc111302-sudo/spring-flowering-analysis

배포 성공: https://github.com/ysc111302-sudo/spring-flowering-analysis/actions/runs/40193914787

전체 12장을 Chrome 두 해상도에서 검증했습니다. 이미지·폰트·차트·이동·전체화면·애니메이션·해시 새로고침·출처 왕복을 확인했습니다. W07 외부 원문은 현재 404이며 출처 페이지에 표시했습니다. 실제 프로젝터와 Safari/Firefox는 미검증입니다.

재배포: site/ 수정 시 deployment-manifest.json의 파일 해시·바이트 수도 갱신한 뒤 main에 일반 push합니다. Actions 성공 후 공개 주소를 확인합니다. 로컬 원본 프로젝트에서는 scripts/package_spring.py → scripts/prepare_spring_pages.py를 사용하고 격리된 배포 저장소에서 commit/push합니다.


2026-10-25 과제 보완: 데이터 소개 다음 새 4장에 세 가지 분석 질문·방법·시각화를 추가했습니다. 자료 수집·정제 및 1차 분석 완료를 명시했고 기존 결과는 유지했습니다. 총 12장, 공개 URL은 같습니다.
