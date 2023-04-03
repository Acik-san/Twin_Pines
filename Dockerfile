FROM scratch
RUN mkdir -p /full_todo/app
WORKDIR /home/user/full_todo
ADD start-dev.sh /full_todo
CMD start-dev.sh
