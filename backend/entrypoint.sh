#!/bin/bash

# 1. Define paths
WAR_FILE="/usr/local/tomcat/webapps/quizzes.war"
DIR_PATH="/usr/local/tomcat/webapps/quizzes"

# 2. Check if we need to unpack
if [ -f "$WAR_FILE" ]; then
    echo "Manually unpacking quizzes.war..."
    mkdir -p "$DIR_PATH"
    
    # Use 'unzip' or 'jar' (jar is guaranteed to be in the container)
    cd "$DIR_PATH"
    jar -xf "$WAR_FILE"
    
    echo "Removing WAR file to prevent overwrite..."
    rm -f "$WAR_FILE"
fi

# 3. Start Tomcat normally
echo "Starting Tomcat..."
exec catalina.sh run